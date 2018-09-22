import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import * as modules from 'src/app/modules';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    modules.ApiClientsModule,
    modules.TextEditorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true
    }),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
