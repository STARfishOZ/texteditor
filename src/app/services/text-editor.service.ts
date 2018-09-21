import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { DataMuseApi } from '../api-clients/DataMuseApi';
import {map} from 'rxjs/operators';

@Injectable()
export class TextEditorService {

  /**
   * Default value for amount of words to deliver
   */
  private maxWordsAmountDefault = 10;

  constructor(private dataMuseApiService: DataMuseApi) {
  }

  /**
   * return Observable with array of strings
   */
  public getSynonymsListForSelection(value: string, amount = this.maxWordsAmountDefault): Observable<string[]> {
    return this.dataMuseApiService.getSynonymsList(value, amount)
      .pipe(map(data => data.map(item => item.word)));
  }
}
