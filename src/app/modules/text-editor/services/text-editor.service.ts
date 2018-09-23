import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { DataMuseApi, RandomTextApi } from 'src/app/modules/api-clients';
import { ITextEditorService } from 'src/app/interfaces/ITextEditor';
import { ToastTitles } from 'src/app/enums/toast.enums';

@Injectable()
export class TextEditorService implements ITextEditorService {

  /**
   * Default value for amount of words to deliver
   */
  private maxWordsAmountDefault = 10;

  constructor(private dataMuseApiService: DataMuseApi,
              private randomTextApiService: RandomTextApi,
              private toastService: ToastrService) {
  }

  /**
   * return Observable with array of strings
   */
  public getSynonymsListForSelection(value: string, amount = this.maxWordsAmountDefault): Observable<string[]> {
    return this.dataMuseApiService.getSynonymsList(value, amount)
      .pipe(
        map(data => data.map(item => item.word),
        catchError((error) => {
          this.toastService.error(`dataMuseApi ${error.name}`, ToastTitles.ERROR);
          return of('Something went wrong!');
        })
      ));
  }

  /**
   * return Observable with text
   */
  public getRandomText(): Observable<string> {
    return this.randomTextApiService.getRandomText()
      .pipe(
        map(data => data.text_out),
        catchError((error) => {
          this.toastService.error(`randomTextApi ${error.name}`, ToastTitles.ERROR);
          return of('Something went wrong!');
      }));
  }
}
