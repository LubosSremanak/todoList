import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalLoadingService } from '../service/global-loading/global-loading.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private globalLoading: GlobalLoadingService,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.errorHandler));
  }

  private errorHandler = (error: HttpErrorResponse): Observable<any> => {
    this.globalLoading.stopLoading();
    this.snackbarService.openDefault('Something went wrong 😢', 'danger');
    if (error.error instanceof ErrorEvent) {
      const errorMsg = `Client error: Message:${error.error.message}`;
      return throwError(() => new Error(errorMsg));
    } else {
      const errorMsg = `Server error: Code:${error.status},  Message: ${error.message}`;
      return throwError(() => new Error(errorMsg));
    }
  };
}
