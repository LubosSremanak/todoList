import { ActionType } from './action-type';

export interface ActionEvent {
  type: ActionType;
  data?: any;
}
