import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterSpinnerComponent } from './router-spinner/router-spinner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigationComponent, RouterSpinnerComponent],
  exports: [NavigationComponent, RouterSpinnerComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
