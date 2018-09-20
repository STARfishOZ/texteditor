import { Injectable, InjectionToken } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export const BASE_PATH = new InjectionToken<string>('basePath');

@Injectable()
export class TextService {

  protected basePath = 'https://api.datamuse.com/words';

  constructor(protected httpClient: HttpClient) {
  }

  public getSynonymsList(value: string): Observable<any> {
    return this.httpClient.get(`${this.basePath}/?rel_syn=${value}`);
  }

  public getSingleSynonym(value: string): Observable<any> {
    return this.httpClient.get(`${this.basePath}?rel_syn=${value}&max=1`);
  }
}
