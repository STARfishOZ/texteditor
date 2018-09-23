/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DataMuseApi, RandomTextApi } from 'src/app/modules/api-clients';
import { TextEditorService } from 'src/app/modules/text-editor/services/text-editor.service';

describe('RandomTextApi', () => {

  let service: TextEditorService;
  let dataMuseApiSpy: jasmine.SpyObj<DataMuseApi>;
  let randomTextApiSpy: jasmine.SpyObj<RandomTextApi>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {

    dataMuseApiSpy = jasmine.createSpyObj('DataMuseApi', ['getSynonymsList']);
    randomTextApiSpy = jasmine.createSpyObj('RandomTextApi', ['getRandomText']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'info', 'error']);

    TestBed.configureTestingModule({
      providers: [
        TextEditorService,
        {
          provide: DataMuseApi,
          useValue: dataMuseApiSpy
        },
        {
          provide: RandomTextApi,
          useValue: randomTextApiSpy
        },
        {
          provide: ToastrService,
          useValue: toastrServiceSpy
        }
      ]
    });

  });

  describe('getSynonymsList', () => {

    beforeEach(inject([TextEditorService], (textEditorService: TextEditorService) => {
      service = textEditorService;

      dataMuseApiSpy.getSynonymsList.and.throwError('MUST NOT BE CALLED');
    }));

    it('should be called with correct data ', () => {
      dataMuseApiSpy.getSynonymsList.and.returnValue(of(['something', 5]));

      service.getSynonymsListForSelection('something', 5);

      expect(dataMuseApiSpy.getSynonymsList)
        .toHaveBeenCalledTimes(1);
      expect(dataMuseApiSpy.getSynonymsList.calls.argsFor(0))
        .toEqual(['something', 5]);
      expect(toastrServiceSpy.error)
        .toHaveBeenCalledTimes(0);
    });

  });
});
