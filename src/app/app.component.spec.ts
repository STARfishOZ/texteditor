import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import * as modules from 'src/app/modules';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        modules.ApiClientsModule,
        modules.TextEditorModule,
        ToastrModule.forRoot()
      ],
      providers: []
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'ae-frontend-texteditor-angular-skeleton'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Simple Text Editor');
  }));
});
