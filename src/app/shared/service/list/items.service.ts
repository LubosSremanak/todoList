import { Injectable } from '@angular/core';
import { ActionEvent } from '../../components/actions/model/action-event';
import { Item } from '../../components/list/item/model/item';
import { ItemApiService } from '../../../api/item/item-api.service';
import { lastValueFrom } from 'rxjs';
import { GlobalLoadingService } from '../global-loading/global-loading.service';
import { HttpParams } from '@angular/common/http';
import { ItemsParams } from './items-params';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SnackbarService } from '../snackbar/snackbar.service';
import { DialogService } from '../dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private itemsApi: ItemApiService,
    private snackbarService: SnackbarService,
    private dialogService: DialogService,
    private globalLoading: GlobalLoadingService
  ) {}

  public async getAllItems(
    listId: string,
    itemsParams: ItemsParams
  ): Promise<Item[]> {
    let httpParams = this.createQueryParams(itemsParams);
    this.globalLoading.emitLoading();
    const items = await lastValueFrom(this.itemsApi.getAll(httpParams, listId));
    this.globalLoading.stopLoading();
    return items;
  }

  public async handleAction(
    { type, data }: ActionEvent,
    itemsParams: ItemsParams
  ): Promise<void> {
    this.globalLoading.emitLoading();
    const listId: string = data?.list?.id;
    const itemId: string = data?.item?.id;
    if (type === 'addItem') {
      await this.addItem(listId);
    } else if (type === 'removeItem') {
      await this.removeItem(listId, itemId);
    } else if (type === 'editItem') {
      await this.editItem(listId, itemId, data.item);
    } else if (type === 'markAsDone') {
      await this.markAsDone(listId, itemId, data.item);
    } else if (type === 'filterItems') {
      await this.filterItems(itemsParams, data);
    } else if (type === 'searchItem') {
      await this.searchItem(itemsParams, data);
    }
    this.snackbarService.openDefault('Successfully done 😊', 'success');
    this.globalLoading.stopLoading();
  }

  private async addItem(listId: string): Promise<void> {
    const newItem: Item = this.createDefaultItem(listId);
    await lastValueFrom(this.itemsApi.create(newItem, listId));
  }

  private async editItem(
    listId: string,
    itemId: string,
    item: Item
  ): Promise<void> {
    await lastValueFrom(this.itemsApi.update(itemId, item, listId));
  }

  private async removeItem(listId: string, id: string): Promise<void> {
    await new Promise(resolve => {
      this.dialogService.openDeleteDialog(
        this.removeHandler(id, listId, resolve)
      );
    });
  }

  private removeHandler =
    (listId: string, id: string, resolve: any) =>
    async (result: boolean): Promise<void> => {
      if (result) {
        await lastValueFrom(this.itemsApi.delete(id, listId));
      }
      resolve();
    };

  private createDefaultItem = (listId: string): Item => ({
    listId,
    content: '',
    endDate: new Date(),
    isDone: false,
    title: 'Item',
  });

  private createQueryParams = (itemsParams: ItemsParams): HttpParams => {
    const all = itemsParams.filterKey === 'all';
    const done = itemsParams.filterKey === 'done';
    const searchValue = itemsParams.searchValue;
    const isDone = all ? '' : done;
    if (searchValue) {
      return new HttpParams().set('title', searchValue);
    }
    return new HttpParams().set('isDone', isDone);
  };

  private filterItems = async (
    itemsParams: ItemsParams,
    data: any
  ): Promise<void> => {
    itemsParams.filterKey = data.filterKey;
    itemsParams.searchValue = '';
  };

  private searchItem = async (
    itemsParams: ItemsParams,
    data: any
  ): Promise<void> => {
    itemsParams.filterKey = 'all';
    itemsParams.searchValue = data.value;
  };

  private async markAsDone(
    listId: string,
    itemId: string,
    item: Item
  ): Promise<void> {
    item = { ...item, isDone: !item.isDone };
    await this.editItem(listId, itemId, item);
  }

  moveItem(event: CdkDragDrop<any>): void {
    const previousIndex = event.previousIndex;
    const previousContainer = event.previousContainer;
    const currentIndex = event.currentIndex;
    const currentContainer = event.container;

    if (previousContainer === currentContainer) {
      moveItemInArray(currentContainer.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        previousContainer.data,
        currentContainer.data,
        previousIndex,
        currentIndex
      );
    }
  }
}
