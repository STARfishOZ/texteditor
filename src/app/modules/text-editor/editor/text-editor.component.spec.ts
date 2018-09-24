import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as components from 'src/app/modules/text-editor';
import * as pipes from 'src/app/pipes';
import { TextEditorService } from '../services/text-editor.service';
import { ToastrService } from 'ngx-toastr';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import * as textEditorPack from '../index';

describe('TextEditorComponent', () => {
  let component: components.TextEditorComponent;
  let fixture: ComponentFixture<components.TextEditorComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let textEditorServiceSpy: jasmine.SpyObj<TextEditorService>;

  beforeEach(async(() => {

    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'info', 'error']);
    textEditorServiceSpy = jasmine.createSpyObj('TextEditorService', ['getRandomText', 'getSynonymsListForSelection']);

    TestBed.configureTestingModule({
      declarations: [
        components.TextEditorComponent,
        components.EditorActionButtonComponent,
        components.ColorPaletteComponent,
        pipes.StripHtmlPipe
      ],
      providers: [
        {
          provide: TextEditorService,
          useValue: textEditorServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastrServiceSpy
        }
      ]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [textEditorPack.ColorPaletteComponent]
      }
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(components.TextEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  describe('ngOnInit', () => {

    it('should init component', () => {
      expect(component).toBeTruthy();
    });

    it('should call textEditorService getRandomText method', () => {
      textEditorServiceSpy.getRandomText.and.returnValue(of(['asd']));

      expect(textEditorServiceSpy.getRandomText)
        .toHaveBeenCalledTimes(1);
    });

  });

  describe('getSynonyms', () => {

    it('should call textEditorService getSynonymsListForSelection method', () => {
      textEditorServiceSpy.getSynonymsListForSelection.and.returnValue(of(['asd']));
      textEditorServiceSpy.getSynonymsListForSelection('Something', 5);

      expect(textEditorServiceSpy.getSynonymsListForSelection)
        .toHaveBeenCalledTimes(1);
      expect(textEditorServiceSpy.getSynonymsListForSelection)
        .toHaveBeenCalledWith('Something', 5);
    });

  });
});
