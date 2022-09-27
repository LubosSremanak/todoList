import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoadingService {
  private readonly _loading$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  get loading$(): Subject<boolean> {
    return this._loading$;
  }

  public emitLoading(): void {
    this._loading$.next(true);
  }

  public stopLoading(): void {
    this._loading$.next(false);
  }
}
