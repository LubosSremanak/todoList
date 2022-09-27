import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ActionEvent } from '../actions/model/action-event';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements OnInit {
  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  private subject: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.subject.pipe(debounceTime(200)).subscribe(this.emitChange);
  }

  keyUp($event: any): void {
    const value = $event.target?.value;
    this.subject.next(value);
  }

  private emitChange = (value: string): void => {
    const actionEvent: ActionEvent = {
      type: 'searchItem',
      data: { value },
    };
    this.action.emit(actionEvent);
  };
}
