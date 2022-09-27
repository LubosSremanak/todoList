import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { List } from './model/list';
import { Filter } from '../filters/model/filter';
import { Action } from '../actions/model/action';
import { ActionEvent } from '../actions/model/action-event';
import { ItemsService } from '../../service/list/items.service';
import { ItemsParams } from '../../service/list/items-params';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() list?: List;

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  private itemsParams: ItemsParams = { filterKey: 'all', searchValue: '' };

  readonly filters: Filter[] = [
    { key: 'all', value: 'All', isSelected: true },
    { key: 'active', value: 'Active' },
    { key: 'done', value: 'Done' },
  ];

  readonly actions: Action[] = [
    { iconId: 'add', event: { type: 'addItem' }, tooltip: 'Add item' },
    {
      iconId: 'close',
      event: { type: 'removeList' },
      tooltip: 'Remove list',
      colorClass: 'text-red-500',
    },
  ];

  constructor(
    private itemsService: ItemsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  async handleActions($event: ActionEvent): Promise<void> {
    $event.data = this.addListToEventData($event);
    const type = $event.type;
    if (['removeList', 'addList', 'editList'].includes(type)) {
      this.action.emit($event);
    } else {
      await this.itemsService.handleAction($event, this.itemsParams);
      await this.loadItems();
    }
  }

  drop(event: CdkDragDrop<any>): void {
    this.itemsService.moveItem(event);
  }

  async handleHeaderActions($event: ActionEvent): Promise<void> {
    $event.type = $event.type === 'edit' ? 'editList' : $event.type;
    await this.handleActions($event);
  }

  private async loadItems(): Promise<void> {
    const listId = this.list?.id;
    if (this.list && listId) {
      const itemsParams = this.itemsParams;
      const items = await this.itemsService.getAllItems(listId, itemsParams);
      this.list.items = [...items];
      this.changeDetector.detectChanges();
    }
  }

  private addListToEventData($event: ActionEvent): any {
    return { ...$event.data, list: this.list };
  }
}
