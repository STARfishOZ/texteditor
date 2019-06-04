import { Observable } from 'rxjs';

import { TextAction } from 'src/app/enums';

export interface IEditorActionButtonComponent {
  actionType: TextAction;
  configureTextAction(actionType: TextAction): void;
}

export interface IColorPaletteComponent {
  color: string;
  changeFontColor(): void;
}

export interface ITextEditor {
  text$: Observable<string>;
  getSynonym(): void;
}

export interface ITextEditorService {
  getSynonymsListForSelection(value: string, amount: number): Observable<string[]>;
  getRandomText(): Observable<string>;
}
