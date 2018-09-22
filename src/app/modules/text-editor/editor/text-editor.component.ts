import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { TextEditorService } from 'src/app/modules/text-editor/services/text-editor.service';
import { ToastTitlesEnums } from 'src/app/enums/toast.enums';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent implements OnInit, OnDestroy {

  /**
   * Property to stream the text from service
   */
  public text$: Observable<string>;

  private synonymsData$: Subscription;

  public constructor(@Inject(DOCUMENT) private document,
                     private textEditorService: TextEditorService,
                     private toastService: ToastrService) {
  }

  public ngOnInit(): void {
    this.text$ = this.textEditorService.getRandomText();
  }

  public ngOnDestroy(): void {
    // for @AutoUnsubscribe, If you work with AOT this method must be present, even if empty!
  }

  /**
   * Providing list of available synonyms and replacing word with one of them
   */
  public getSynonyms(): void {
    // in case selection is empty and synonym button was clicked before working with editor
    if (!window.getSelection().rangeCount) {
      window.getSelection().addRange(this.document.createRange());
    }

    const selectedText = window.getSelection().getRangeAt(0).toString();

    if (selectedText.split(' ').length > 1 || selectedText === '') {
      this.toastService.error(`Select at least one word not more. Please try again.`, ToastTitlesEnums.ERROR);
      return;
    }

    const selectedTrimmedText = selectedText.trim();

    this.synonymsData$ = this.textEditorService.getSynonymsListForSelection(selectedTrimmedText)
      .subscribe((result: string[]) => {
        if (!result.length) {
          this.toastService.info(`Synonyms for word ${selectedTrimmedText} haven't been found. Please try again.`,
            ToastTitlesEnums.INFO);

          return;
        }

        this.toastService.success(`Synonyms for word ${selectedTrimmedText} found: ${result.join(', ')}`, ToastTitlesEnums.SUCCESS);
        this.useSynonymInsteadOrigin(result[0]);
      });
  }

  /**
   * Replacing original word with provided synonym
   */
  private useSynonymInsteadOrigin(synonym: string): void {
    this.document.execCommand('insertText', false, synonym);
  }

  // Didnt had time to make it dynamic
  public changeFontColor(value: string): void {
    this.document.execCommand('forecolor', false, value);
  }

}
