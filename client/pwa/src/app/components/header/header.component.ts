import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Rx';

import { LogoutAction } from '../../shared/auth/store/auth.actions';

@Component({
  selector: 'momo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(state => state.auth.isAuth) isAuth$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new LogoutAction).subscribe(_ => {
      this.router.navigate(['/login']);
    })
  }
}
