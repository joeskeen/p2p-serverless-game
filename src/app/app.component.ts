import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IUser } from './user/user';
import { Store, select } from '@ngrx/store';
import { AppState } from './global/app.reducer';
import { requestLoadUser, requestEditUser } from './user/user.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { getUser } from './user/user.reducer';
import { ModalService, Drawer } from '@healthcatalyst/cashmere';
import {
  requestCreateGroup,
  requestJoinGroup,
  requestCancelEditGroup,
} from './group/group.actions';
import { IGroup } from './group/group';
import { getGroup, GroupState } from './group/group.reducer';
import { switchMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  readonly user$: Observable<IUser>;
  readonly group$: Observable<GroupState>;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.user$ = store.pipe(select(getUser));
    this.group$ = store.pipe(select(getGroup));
    this.modalService.allowMultiple = true;
  }

  async ngOnInit() {
    this.store.dispatch(requestLoadUser());
  }

  createGroup() {
    this.store.dispatch(requestCreateGroup());
  }

  joinGroup() {
    this.store.dispatch(requestJoinGroup());
  }

  onGroupSettingsClosed() {
    this.store.dispatch(requestCancelEditGroup());
  }

  async editUser() {
    this.store.dispatch(requestEditUser({ mandatory: false }));
  }
}
