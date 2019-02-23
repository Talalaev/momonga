import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoadingStreamService, ErrorsStreamService } from 'ngx-api-manager';

import { LoginAction } from '../../store/auth/auth.actions';


@Component({
  selector: 'momo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMsg: string;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  loading$ = this.loadings
    .loadingStream$
    .filter(action => action.requestPoint === "post:[Auth] Login")
    .map(({state}) => state);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private loadings: LoadingStreamService,
    private errors: ErrorsStreamService,
    private router: Router,
  ) {
    this.errors
      .errorsStream$
      .filter(({errorPoint}) => errorPoint === 'post:[Auth] Login')
      .map(action => {
        let cause: any = action.error.cause;
        return cause.error.message;
      })
      .do(_ => setTimeout(() => (this.errorMsg = ''), 5000))
      .subscribe((msg: string) => this.errorMsg = msg);
  }

  ngOnInit() {}

  signIn() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(new LoginAction(this.loginForm.value)).subscribe(res => {
      this.router.navigate(['dojo']);
    });
  }
}
