import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoadingStreamService, ErrorsStreamService } from 'ngx-api-manager';
import { RegistrationAction } from '../../shared/auth/store/auth.actions';

@Component({
  selector: 'momo-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMsg: string;

  get login() { return this.registrationForm.get('login'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  loading$ = this.loadings
    .loadingStream$
    .filter(action => action.requestPoint === "post:[Auth] Registration")
    .map(({state}) => state);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private loadings: LoadingStreamService,
    private errors: ErrorsStreamService,
    private router: Router
  ) {
    this.errors
      .errorsStream$
      .filter(({errorPoint}) => errorPoint === 'post:[Auth] Registration')
      .map(action => {
        let cause: any = action.error.cause;
        return cause.error.message;
      })
      .do(_ => setTimeout(() => (this.errorMsg = ''), 5000))
      .subscribe((msg: string) => this.errorMsg = msg);
  }

  ngOnInit() {
  }

  submit() {
    if (this.registrationForm.invalid) return;

    this.store.dispatch(new RegistrationAction(this.registrationForm.value)).subscribe(res => {
      this.router.navigate(['dojo']);
    });
  }
}
