import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Action } from '../../actions/model/action';
import { ActionEvent } from '../../actions/model/action-event';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() titleRef?: { title: string };
  @Input() actions: Action[] = [];

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {}

  emitAction($event: ActionEvent): void {
    this.action.emit($event);
  }
}
