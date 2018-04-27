import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { AuthActions } from '../store/actions/auth.actions';
import { AppState } from '../store/appState';

@Injectable()
export class AuthService {
    constructor(
        private http: Http,
        public actions: AuthActions,
        private store: Store<AppState>
    ) {}

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    verifyAuth(): Observable<boolean> {
        return this.http
            .get("api/verify-auth")
            .map(res => {
                this.actions.login(res.json());
                return true
            })
            .catch(err => {
                this.actions.logout();
                return Observable.of(false)
            });
    }

    tryingToLogin(user: User) {
        this.actions.tryingToLogin({
            user,
            redirectUrl: this.redirectUrl
        });
    }

    tryingToLogout() {
        this.actions.tryingToLogout();
    }

    tryingToRegistration(user: User) {
        this.actions.tryingToRegistration({
            user
        });
    }

    getIsLoggedIn(): Observable<{}> {
        return this.store.select('isLoggedIn');
    }

    getUser(): Observable<{}> {
        return this.store.select('user');
    }

    /**
     * Обычне методы авторизации без ngrx и ngeffects (redux)
     * @example
     * login(user: User): Observable<boolean> {
     *   let headers = new Headers({
     *       'Content-Type': 'application/json'
     *   let options = new RequestOptions({
     *       headers,
     *       withCredentials: true
     *   });
     *
     *   return this.http
     *       .post(`http://localhost:8888/login`, user, options)
     *       .map(res => {
     *           return res.json();
     *       })
     *       .catch((err: any): any => {
     *           return Observable
     *               .of({
     *                   error: true,
     *                   status: 400
     *               })
     *               .do(val => false);
     *       });
     * }
     *
     * logout(): Observable<boolean> {
     *   return this.http
     *       .get("logout")
     *       .map(res => false)
     *       .catch(err => Observable.of(false));
     * }
     * */
}