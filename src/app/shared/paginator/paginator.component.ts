import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActionEvent } from '../components/actions/model/action-event';

export interface PaginationParams {
  page: number;
  limit: number;
  maxPages: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() paginationParams: PaginationParams = {
    page: 1,
    limit: 4,
    maxPages: 10,
  };

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {}

  next(): void {
    this.paginationParams.page++;
    if (this.paginationParams.page > this.paginationParams.maxPages) {
      this.paginationParams.page = 1;
    }
    this.emitAction();
  }

  previous(): void {
    this.paginationParams.page--;
    if (this.paginationParams.page < 1) {
      this.paginationParams.page = 1;
    }
    this.emitAction();
  }

  private emitAction(): void {
    const actionEvent: ActionEvent = {
      type: 'pagination',
      data: this.paginationParams,
    };
    this.action.emit(actionEvent);
  }
}
