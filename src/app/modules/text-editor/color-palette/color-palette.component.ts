import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { IColorPaletteComponent } from 'src/app/interfaces/ITextEditor';
import { TextAction } from 'src/app/enums';

@Component({
  selector: 'color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPaletteComponent implements IColorPaletteComponent {

  @Input() public color: string;

  public constructor(@Inject(DOCUMENT) private document) {
  }

  public changeFontColor(): void {
    this.document.execCommand(TextAction.FORECOLOR, false, this.color);
  }
}
