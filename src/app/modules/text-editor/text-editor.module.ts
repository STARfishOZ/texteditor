import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorService } from 'src/app/modules/text-editor/services/text-editor.service';
import * as textEditorPack from 'src/app/modules/text-editor';
import * as pipes from 'src/app/pipes';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    textEditorPack.EditorActionButtonComponent,
    textEditorPack.TextEditorComponent,
    pipes.StripHtmlPipe
  ],
  providers: [ TextEditorService ],
  exports: [ textEditorPack.TextEditorComponent ]
})
export class TextEditorModule {
}
