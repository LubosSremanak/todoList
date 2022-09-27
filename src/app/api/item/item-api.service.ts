import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../common/api.service';
import { Item } from '../../shared/components/list/item/model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemApiService extends ApiService<Item> {
  readonly url = `${environment.baseApiUrl}/api/v1/lists`;
  override readonly childEndpoint = `items`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
