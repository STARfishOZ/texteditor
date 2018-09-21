import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from 'src/app/app.component';
import { DataMuseApi } from 'src/app/api-clients/DataMuseApi';
import { TextEditorService } from 'src/app/services/text-editor.service';
import * as components from 'src/app/components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    components.FileComponent,
    components.ControlPanelComponent,
    components.HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [ DataMuseApi, TextEditorService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
