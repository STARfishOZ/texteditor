import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISynonymData } from '../interfaces/ISynonymData';

@Injectable()
export class DataMuseApi {

  protected basePath = 'https://api.datamuse.com/words';

  constructor(protected httpClient: HttpClient) {
  }

  public getSynonymsList(value: string, amount?: number): Observable<ISynonymData[]> {
    return this.httpClient.get<ISynonymData[]>(`${this.basePath}/?rel_syn=${value}&max=${amount}`);
  }
}
