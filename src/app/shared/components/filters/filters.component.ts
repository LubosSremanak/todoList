import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Filter } from './model/filter';
import { ActionEvent } from '../actions/model/action-event';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input() filters: Filter[] = [];

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {}

  emitAction(filter: Filter): void {
    this.selectFilterByKey(filter.key);
    const data = { filterKey: filter.key };
    const event: ActionEvent = { type: 'filterItems', data };
    this.action.emit(event);
  }

  trackFilter(index: any, filter: Filter): string {
    return filter.key;
  }

  private selectFilterByKey(key: string): void {
    this.filters.forEach(filter => (filter.isSelected = filter.key === key));
  }
}
