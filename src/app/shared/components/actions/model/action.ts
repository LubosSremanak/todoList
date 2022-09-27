import { ActionEvent } from './action-event';

export interface Action {
  iconId: string;
  event: ActionEvent;
  colorClass?: string;
  tooltip: string;
}
