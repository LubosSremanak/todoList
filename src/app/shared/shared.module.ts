import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { MaterialModule } from './modules/material/material.module';
import { FiltersComponent } from './components/filters/filters.component';
import { ActionsComponent } from './components/actions/actions.component';

import { HeaderComponent } from './components/list/header/header.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { LottieModule } from './modules/lottie-ls/lottie.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    FiltersComponent,
    ActionsComponent,
    SearchFieldComponent,
    HeaderComponent,
    SpinnerComponent,
    PaginatorComponent,
    DialogComponent,
    PlaceholderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LottieModule,
    DragDropModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [
    MaterialModule,
    LottieModule,
    DragDropModule,
    ListComponent,
    SpinnerComponent,
    PaginatorComponent,
    PlaceholderComponent,
  ],
})
export class SharedModule {}
