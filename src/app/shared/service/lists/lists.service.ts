import { Injectable } from '@angular/core';
import { ListApiService } from '../../../api/list/list-api.service';
import { GlobalLoadingService } from '../global-loading/global-loading.service';
import { ActionEvent } from '../../components/actions/model/action-event';
import {
  catchError,
  ignoreElements,
  lastValueFrom,
  Observable,
  of,
  tap,
} from 'rxjs';
import { List } from '../../components/list/model/list';
import { HttpParams } from '@angular/common/http';
import { PaginationParams } from '../../paginator/paginator.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SnackbarService } from '../snackbar/snackbar.service';
import { DialogService } from '../dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private lists: List[] = [];

  constructor(
    private listApi: ListApiService,
    private globalLoading: GlobalLoadingService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) {}

  public async handleAction({ type, data }: ActionEvent): Promise<void> {
    this.globalLoading.emitLoading();
    const listId = data?.list?.id;
    if (type === 'addList') {
      await this.addList();
    } else if (type === 'removeList') {
      await this.removeList(listId);
    } else if (type === 'editList') {
      await this.editList(listId, data.list);
    }
    this.snackbarService.openDefault('Successfully done 😊', 'success');
    this.globalLoading.stopLoading();
  }

  public getAll(paginationParams: PaginationParams): Observable<List[]> {
    const params = this.createQueryParams(paginationParams);
    return this.listApi.getAll(params).pipe(tap(l => (this.lists = l)));
  }

  createErrorHandler(lists$: Observable<List[]>): Observable<List[]> {
    return lists$.pipe(
      ignoreElements(),
      catchError(err => {
        this.globalLoading.stopLoading();
        return of(err);
      })
    );
  }

  private async addList(): Promise<void> {
    const defaultList = this.createDefaultList();
    return await lastValueFrom(this.listApi.create(defaultList));
  }

  private async editList(listId: string, data: List): Promise<void> {
    return await lastValueFrom(this.listApi.update(listId, data));
  }

  private async removeList(id: string): Promise<void> {
    await new Promise(resolve => {
      this.dialogService.openDeleteDialog(this.removeHandler(id, resolve));
    });
  }

  private removeHandler =
    (listId: string, resolve: any) =>
    async (result: boolean): Promise<void> => {
      if (result) {
        await lastValueFrom(this.listApi.delete(listId));
      }
      resolve();
    };

  private createDefaultList = (): List => ({
    items: [],
    title: `New List ${this.lists.length}`,
  });

  private createQueryParams = (
    paginationParams: PaginationParams
  ): HttpParams => {
    return new HttpParams()
      .set('page', paginationParams.page || 1)
      .set('limit', paginationParams.limit || 5);
  };

  moveLists(event$: CdkDragDrop<any>): void {
    moveItemInArray(
      event$.container.data,
      event$.previousIndex,
      event$.currentIndex
    );
  }
}
