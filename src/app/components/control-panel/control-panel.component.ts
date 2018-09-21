import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastrService } from 'ngx-toastr';

import { TextAction } from 'src/app/enums/text-actions.enums';
import { TextEditorService } from 'src/app/services/text-editor.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class ControlPanelComponent implements OnInit, OnDestroy {

  private readonly MESSAGE_TITLES = {
    success: 'SUCCESS',
    error: 'ERROR',
    info: 'INFO'
  };

  private synonymsData$: Subscription;

  public constructor(@Inject(DOCUMENT) private document,
                     private textEditorService: TextEditorService,
                     private toastService: ToastrService) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    // for @AutoUnsubscribe, If you work with AOT this method must be present, even if empty!
  }

  public getSynonyms(): void {
    const selectedText = window.getSelection().getRangeAt(0).toString();

    if (selectedText.split(' ').length > 1) {
      this.toastService.error(`Select only one word. Please try again.`, this.MESSAGE_TITLES.error);
      return;
    }

    const selectedTrimmedText = selectedText.trim();

    this.synonymsData$ = this.textEditorService.getSynonymsListForSelection(selectedTrimmedText)
      .subscribe((result: string[]) => {
        if (!result.length) {
          this.toastService.info(`Synonyms for word ${selectedTrimmedText} haven't been found. Please try again.`,
            this.MESSAGE_TITLES.info);

          return;
        }

        this.toastService.success(`Synonyms for word ${selectedTrimmedText} found: ${result.join(', ')}`, this.MESSAGE_TITLES.info);
        this.document.execCommand('insertText', false, result[0]);
      }, (error) => {
        console.log(error);
        this.toastService.error(error.name, this.MESSAGE_TITLES.error);
      });
  }

  // Didnt had time to make it dynamic
  public changeFontColor(value: string): void {
    this.document.execCommand('forecolor', false, value);
  }

  public configureTextAction(actionType: TextAction): void {
    if (actionType === TextAction.HEADING1 || actionType === TextAction.HEADING2 || actionType === TextAction.PARAGRAPH) {
      this.document.execCommand('formatBlock', false, actionType);
    } else if (actionType === TextAction.IMAGE) {
      const url = prompt('Enter the link here: ', 'http:\/\/');
      this.document.execCommand(actionType, false, url);
    } else {
      this.document.execCommand(actionType, false, null);
    }
  }
}
