import { NgModule } from '@angular/core';
import * as apiClientsPack from 'src/app/modules/api-clients';

@NgModule({
  providers: [
    apiClientsPack.DataMuseApi,
    apiClientsPack.RandomTextApi
  ]
})
export class ApiClientsModule {
}
