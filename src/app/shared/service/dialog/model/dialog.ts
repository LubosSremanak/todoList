import { ComponentType } from '@angular/cdk/overlay';

export interface Dialog {
  data: any;
  component: ComponentType<unknown>;
  config?: any;

  resultHandler(result: boolean | undefined): void;
}
