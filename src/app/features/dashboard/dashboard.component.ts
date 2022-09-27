import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { List } from '../../shared/components/list/model/list';
import { Observable } from 'rxjs';
import { ActionEvent } from '../../shared/components/actions/model/action-event';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ListsService } from '../../shared/service/lists/lists.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PaginationParams } from '../../shared/paginator/paginator.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation({ anchor: 'enterAnimation' })],
})
export class DashboardComponent implements OnInit {
  lists$?: Observable<List[]>;
  listsError$?: Observable<List[]>;
  paginationParams: PaginationParams = { limit: 5, page: 1, maxPages: 10 };

  constructor(
    private listsService: ListsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadLists();
  }

  async addList(): Promise<void> {
    await this.handleListAction({ type: 'addList' });
  }

  async handleListAction($event: ActionEvent): Promise<void> {
    await this.listsService.handleAction($event);
    this.loadLists();
  }

  drop(event$: CdkDragDrop<any>): void {
    this.listsService.moveLists(event$);
  }

  private loadLists(): void {
    this.lists$ = this.listsService.getAll(this.paginationParams);
    this.listsError$ = this.listsService.createErrorHandler(this.lists$);
    this.changeDetector.detectChanges();
  }
}
