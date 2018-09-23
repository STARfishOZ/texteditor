import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SynonymData } from 'src/app/modules/api-clients/DataMuseApi/model';

@Injectable()
export class DataMuseApi {

  protected basePath = 'https://api.datamuse.com/words';

  constructor(protected httpClient: HttpClient) {
  }

  public getSynonymsList(value: string, amount?: number): Observable<SynonymData[]> {
    return this.httpClient.get<SynonymData[]>(`${this.basePath}/?rel_syn=${value}&max=${amount}`);
  }
}
