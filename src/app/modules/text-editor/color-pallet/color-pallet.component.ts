import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TextAction } from 'src/app/enums';

@Component({
  selector: 'color-pallet',
  templateUrl: './color-pallet.component.html',
  styleUrls: ['./color-pallet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPalletComponent {

  @Input() public color: string;

  public constructor(@Inject(DOCUMENT) private document) {
  }

  public changeFontColor(): void {
    this.document.execCommand(TextAction.FORECOLOR, false, this.color);
  }
}
