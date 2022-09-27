import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { environment } from '../../../environments/environment';
import { List } from '../../shared/components/list/model/list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListApiService extends ApiService<List> {
  readonly url = `${environment.baseApiUrl}/api/v1/lists`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
