import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { TextEditorService } from 'src/app/modules/text-editor/services/text-editor.service';
import * as textEditorPack from 'src/app/modules/text-editor';
import * as pipes from 'src/app/pipes';

describe('TextEditorComponent', () => {
  let component: textEditorPack.TextEditorComponent;
  let fixture: ComponentFixture<textEditorPack.TextEditorComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let textEditorServiceSpy: jasmine.SpyObj<TextEditorService>;

  beforeEach(async(() => {

    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'info', 'error']);
    textEditorServiceSpy = jasmine.createSpyObj('TextEditorService', ['getRandomText', 'getSynonymsListForSelection']);

    TestBed.configureTestingModule({
      declarations: [
        textEditorPack.TextEditorComponent,
        textEditorPack.EditorActionButtonComponent,
        textEditorPack.ColorPaletteComponent,
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
        fixture = TestBed.createComponent(textEditorPack.TextEditorComponent);
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

  xdescribe('getSynonym', () => {

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
