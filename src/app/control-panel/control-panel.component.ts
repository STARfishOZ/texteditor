import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TextAction } from 'src/assets/text-actions.enums';
import { TextService } from 'src/app/text-service/text.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']

})
export class ControlPanelComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document,
              private textService: TextService) {
  }

  ngOnInit() {
  }

  public getSynonyms(): void {
    const selectedText = window.getSelection().getRangeAt(0).toString();
    this.textService.getSynonyms(selectedText).subscribe((result: any) => {
      alert(`Synonms: ${result.map(item => item.word).join(', ')}`);
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
