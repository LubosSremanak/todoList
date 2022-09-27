import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from './model/action';
import { ActionEvent } from './model/action-event';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() actions: Action[] = [];
  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {}

  emitAction(event: ActionEvent): void {
    this.action.emit(event);
  }
}
