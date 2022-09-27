import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Item } from './model/item';
import { Action } from '../../actions/model/action';
import { ActionEvent } from '../../actions/model/action-event';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @Input() item?: Item;

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  actions: Action[] = [
    {
      iconId: 'done',
      colorClass: 'text-green-500',
      event: { type: 'markAsDone' },
      tooltip: 'Mark as done',
    },
    {
      iconId: 'close',
      colorClass: 'text-red-500',
      event: { type: 'removeItem' },
      tooltip: 'Remove item',
    },
  ];

  constructor() {}

  handleHeaderAction($event: ActionEvent): void {
    $event.type = $event.type === 'edit' ? 'editItem' : $event.type;
    $event.data = { ...$event, item: this.item };
    this.action.emit($event);
  }

  ngOnInit(): void {
    if (this.item?.isDone) {
      const markDone = this.actions[0];
      markDone.iconId = 'settings_backup_restore';
      markDone.colorClass = 'text-color-black';
      markDone.tooltip = 'Mark as unfinished';
    }
  }
}
