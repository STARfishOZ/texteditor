import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TextAction } from 'src/app/enums/text-actions.enums';

@Component({
  selector: 'editor-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorActionButtonComponent {

  /**
   * Type of editing action for button
   */
  @Input() public actionType: TextAction;

  public constructor(@Inject(DOCUMENT) private document) {
  }

  /**
   * Depending on actionType input configure what action to perform
   */
  public configureTextAction(actionType: TextAction): void {
    switch (actionType) {
      case TextAction.HEADING1:
      case TextAction.HEADING2:
      case TextAction.PARAGRAPH:
        this.document.execCommand('formatBlock', false, actionType);
        break;
      case TextAction.IMAGE:
        const url = prompt('Enter the link here: ', 'http:\/\/');
        this.document.execCommand(actionType, false, url);
        break;
      default:
        this.document.execCommand(actionType, false, null);
        break;
    }
  }

}
