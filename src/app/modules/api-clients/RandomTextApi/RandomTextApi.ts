import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RandomTextData } from 'src/app/modules/api-clients/RandomTextApi/model';

@Injectable()
export class RandomTextApi {

  protected basePath = 'http://www.randomtext.me/api/';

  constructor(protected httpClient: HttpClient) {
  }

  public getRandomText(): Observable<RandomTextData> {
    return this.httpClient.get<RandomTextData>(`${this.basePath}/gibberish/p-1/70-100`);
  }
}
