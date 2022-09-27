import { SnackbarType } from './snackbar-type';

export interface Snackbar {
  message: string;
  action: string;
  type: SnackbarType;
  durationInSeconds: number;
}
