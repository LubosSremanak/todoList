import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from './model/snackbar';
import { SnackbarType } from './model/snackbar-type';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public open(snackbar: Snackbar): void {
    this._snackBar.open(snackbar.message, snackbar.action, {
      duration: snackbar.durationInSeconds * 1000,
      panelClass: ['snackbar', `snackbar-${snackbar.type}`],
    });
  }

  public openDefault(message: string, type: SnackbarType): void {
    const snackbar: Snackbar = {
      action: ' ',
      durationInSeconds: 3,
      message: message,
      type,
    };
    this.open(snackbar);
  }
}
