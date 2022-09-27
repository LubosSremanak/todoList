import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Dialog } from './model/dialog';
import { GlobalLoadingService } from '../global-loading/global-loading.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private globalLoading: GlobalLoadingService
  ) {}

  public openCustomDialog(dialog: Dialog): void {
    const dialogRef = this.dialog.open(dialog.component, {
      ...dialog.config,
      data: dialog.data,
    });

    dialogRef.afterOpened().subscribe(() => {
      this.globalLoading.stopLoading();
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      dialog.resultHandler(result);
    });
  }

  public open(
    component: ComponentType<unknown>,
    config: any
  ): MatDialogRef<any> {
    return this.dialog.open(component, config);
  }

  public openDeleteDialog(
    resultHandler: any,
    question = 'Are you sure you want to delete?'
  ): void {
    const data = {
      question,
      actionSuccess: 'Delete',
      actionDanger: 'Cancel',
    };

    const dialogRef = this.dialog.open(DialogComponent, { data });
    dialogRef.afterClosed().subscribe(resultHandler);
  }
}
