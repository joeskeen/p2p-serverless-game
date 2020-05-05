import { Component } from '@angular/core';
import { AppState } from 'src/app/global/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroup } from '../group';
import { getGroup } from '../group.reducer';
import { first } from 'rxjs/operators';
import { requestAddMembers } from '../group.actions';

@Component({
  selector: 'app-group-members',
  templateUrl: 'group-members.component.html',
  styleUrls: ['group-members.component.scss'],
})
export class GroupMembersComponent {
  readonly group$: Observable<IGroup>;
  readonly isSupremeLeader$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.group$ = store.select(getGroup);
    this.isSupremeLeader$ = store.select(s => s.global?.isUserSupremeLeader);
  }

  async addMembers() {
    this.store.dispatch(requestAddMembers());
  }
}
