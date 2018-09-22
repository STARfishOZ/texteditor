import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { HeaderComponent } from './modules/common/header/header.component';
import { FileComponent } from './components/file/file.component';
import { TextService } from './modules/text-editor/services/text-editor.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ControlPanelComponent,
        HeaderComponent,
        FileComponent
      ],
      providers: [TextService]
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
