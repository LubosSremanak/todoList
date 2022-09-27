import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalLoadingService } from '../../shared/service/global-loading/global-loading.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  loading$: Subject<boolean> = new Subject<boolean>();

  constructor(private globalLoading: GlobalLoadingService) {
    this.loading$ = globalLoading.loading$;
  }
}
