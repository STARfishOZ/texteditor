import { TextAction } from '../enums';
import {Observable} from 'rxjs';

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
  getSynonyms(): void;
}

export interface ITextEditorService {
  getSynonymsListForSelection(value: string, amount: number): Observable<string[]>;
  getRandomText(): Observable<string>;
}
