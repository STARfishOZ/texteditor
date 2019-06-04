import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap, switchMap, filter } from 'rxjs/operators';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastrService } from 'ngx-toastr';

import { ColorPaletteComponent } from 'src/app/modules/text-editor/color-palette/color-palette.component';
import { ITextEditor } from 'src/app/interfaces/ITextEditor';
import { TextEditorService } from 'src/app/modules/text-editor/services/text-editor.service';
import { ToastTitles, TextAction } from 'src/app/enums';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
@AutoUnsubscribe()
export class TextEditorComponent implements OnInit, OnDestroy, ITextEditor {

  /**
   * Reference to container where colors should be attached
   */
  @ViewChild('colorPaletteContainer', { read: ViewContainerRef }) private colorPaletteContainer;

  public editorCommandsSet = TextAction;

  /**
   * Property to stream the text from service
   */
  public text$: Observable<string>;

  private synonymSubject$ = new Subject<string>();

  /**
   * Reference to ColorPaletteComponent which will be generated
   */
  private componentRefs: ComponentRef<ColorPaletteComponent>[] = [];

  /**
   * Set of available colors for color palette usage
   */
  private readonly colorsSet = ['#000000', '#cccccc', 'green', 'red'];

  private synonymsData$: Subscription;

  public constructor(@Inject(DOCUMENT) private document,
                     private textEditorService: TextEditorService,
                     private toastService: ToastrService,
                     private componentResolver: ComponentFactoryResolver) {
  }

  public ngOnInit(): void {
    this.text$ = this.textEditorService.getRandomText();
    this.createColorPalette();
    this.fetchSynonyms();
  }

  // for @AutoUnsubscribe, If you work with AOT this method must be present, even if empty!
  public ngOnDestroy(): void {
    this.removeColorPalette();
  }


  /**
   * Sending selected word as subject to use further
   */
  public getSynonym(): void {
    // in case selection is empty and synonym button was clicked before working with editor
    if (!window.getSelection().rangeCount) {
      window.getSelection().addRange(this.document.createRange());
    }

    const selectedText = window.getSelection().getRangeAt(0).toString();

    if (selectedText.split(' ').length > 1 || selectedText === '') {
      this.toastService.error(`Select at least one word not more. Please try again.`, ToastTitles.ERROR);
      return;
    }

    this.synonymSubject$.next(selectedText.trim());
  }

  /**
   * Providing list of available synonyms and replacing word with one of them
   */
  private fetchSynonyms(): void {
    let valueForSynonym;

    this.synonymsData$ =  this.synonymSubject$
      .pipe(
        filter(value => !!value),
        tap(value => valueForSynonym = value),
        switchMap(value => this.textEditorService.getSynonymsListForSelection(value)),
      )
      .subscribe((result: string[]) => {
        if (!result.length) {
          this.toastService.info(`Synonyms for word ${valueForSynonym} haven't been found. Please try again.`,
            ToastTitles.INFO);

          return;
        }

        this.toastService.success(`Synonyms for word ${valueForSynonym} found: ${result.join(', ')}`, ToastTitles.SUCCESS);
        this.useSynonymInsteadOrigin(result[0]);
      });
  }

  /**
   * Replacing original word with provided synonym
   */
  private useSynonymInsteadOrigin(synonym: string): void {
    this.document.execCommand('insertText', false, synonym);
  }

  /**
   * Adding colorPaletteComponent dynamically
   */
  private createColorPalette(): void {
    const factory = this.componentResolver.resolveComponentFactory(ColorPaletteComponent);

    this.colorPaletteContainer.clear();

    this.colorsSet.forEach((color, index) => {
      this.componentRefs.push(this.colorPaletteContainer.createComponent(factory));
      this.componentRefs[index].instance.color = color;
    });
  }

  /**
   * Remove dynamically added components
   */
  private removeColorPalette(): void {
    this.componentRefs.forEach((componentRef) => {
      componentRef.destroy();
    });
  }
}
