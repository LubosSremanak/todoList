import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  protected abstract readonly url: string;
  protected readonly childEndpoint?: string;

  protected constructor(protected http: HttpClient) {}

  public getAll(params: HttpParams, parentId?: string): Observable<T[]> {
    const childEndpoint = this.createChildUrl(parentId);
    const url = `${this.url}/${childEndpoint}`;
    return this.http.get<T[]>(url, { params }).pipe(shareReplay(1));
  }

  public get(id: string, parentId?: string): Observable<T> {
    const childEndpoint = this.createChildUrl(parentId, id);
    const url = `${this.url}/${childEndpoint}`;
    return this.http.get<T>(url);
  }

  public update(id: string, body: T, parentId?: string): Observable<any> {
    const childEndpoint = this.createChildUrl(parentId, id);
    const url = `${this.url}/${childEndpoint}`;
    return this.http.put<T>(url, body);
  }

  public create(body: T, parentId?: string): Observable<any> {
    const childEndpoint = this.createChildUrl(parentId);
    const url = `${this.url}/${childEndpoint}`;
    return this.http.post<T>(url, body);
  }

  public delete(id: string, parentId?: string): Observable<any> {
    const childEndpoint = this.createChildUrl(parentId, id);
    const url = `${this.url}/${childEndpoint}`;
    return this.http.delete<T>(url);
  }

  private check(parentId?: string): boolean {
    return !!(this.childEndpoint && parentId);
  }

  private createChildUrl(parentId?: string, id?: string): string {
    const isChildEndpoint = this.check(parentId);
    if (isChildEndpoint) {
      return `${parentId}/${this.childEndpoint}/${id || ''}`;
    }
    return `${id || ''}`;
  }
}
