import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as components from 'src/app/modules/text-editor';
import * as pipes from 'src/app/pipes';
import { TextEditorService } from '../services/text-editor.service';
import {DataMuseApi, RandomTextApi} from '../../api-clients';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';

xdescribe('TextEditorComponent', () => {
  let component: components.TextEditorComponent;
  let fixture: ComponentFixture<components.TextEditorComponent>;
  let dataMuseApiSpy: jasmine.SpyObj<DataMuseApi>;
  let randomTextApiSpy: jasmine.SpyObj<RandomTextApi>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {

    dataMuseApiSpy = jasmine.createSpyObj('DataMuseApi', ['getSynonymsList']);
    randomTextApiSpy = jasmine.createSpyObj('RandomTextApi', ['getRandomText']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'info', 'error']);

    const randomTextService = {
      getRandomText() {
        const todos = [{id: 1}];
        return of( todos );
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        components.TextEditorComponent,
        components.EditorActionButtonComponent,
        components.ColorPaletteComponent,
        pipes.StripHtmlPipe
      ],
      providers: [
        TextEditorService,
        {
          provide: DataMuseApi,
          useValue: dataMuseApiSpy
        },
        {
          provide: RandomTextApi,
          useValue: randomTextService
        },
        {
          provide: ToastrService,
          useValue: toastrServiceSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(components.TextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
