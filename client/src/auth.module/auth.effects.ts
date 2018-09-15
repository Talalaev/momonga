// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import { Router } from '@angular/router';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
//
// import { createAction } from '../store/createAction';
// import C from '../store/constants';
//
// @Injectable()
// export class AuthEffects {
//     constructor(
//         private http: Http,
//         private router: Router,
//         private actions$: Actions
//     ) {}
//
//     @Effect({ dispatch: true })
//     login$ = this.actions$
//         .ofType(C.TRYING_TO_LOGIN)
//         //.delay(2000)
//         // .map(action => createAction(C.RESET)) // effect(действие) без задержки
//         // для выполнения асинхронного действия нужно переключиться через switchMap
//         .switchMap(action => {
//             const user = action.payload.user;
//             const redirectUrl = action.payload.redirectUrl;
//             const headers = new Headers({
//                 'Content-Type': 'application/json'
//             });
//             const options = new RequestOptions({
//                 headers,
//                 withCredentials: true
//             });
//
//             return this.http
//                 .post(`http://localhost:8888/api/login`, user, options)
//                 .map(action => {
//                     // this.isLoggedIn = true;
//                     this.router.navigate([redirectUrl ? redirectUrl : '/dojo']);
//                     // return action.json();
//                     return createAction(C.LOGIN, action.json());
//                 })
//                 .catch(action => Observable.of(createAction(C.COULD_NOT_LOGIN, action.json())));
//
//
//             // return Observable.of([1])
//             //     .delay(2000)
//             //     .map(res => createAction(C.LOGIN));
//             // {type: ''}; возващаться нужно действие(action) так как оно будет передано в редусеры
//         });
//
//     @Effect({ dispatch: true })
//     logout$ = this.actions$
//         .ofType(C.TRYING_TO_LOGOUT)
//         //.delay(2000)
//         // .map(action => createAction(C.RESET)) // effect(действие) без задержки
//         // для выполнения асинхронного действия нужно переключиться через switchMap
//         .switchMap(action => {
//             return this.http
//                 .get("api/logout")
//                 .map(action => {
//                     this.router.navigate(['/login']);
//                     return createAction(C.LOGOUT);
//                 })
//                 .catch(action => Observable.of(createAction(C.COULD_NOT_LOGOUT, action.json())));
//
//             // return Observable.of([1])
//             //     .delay(2000)
//             //     .map(res => createAction(C.LOGOUT));
//             // {type: ''}; возващаться нужно действие(action) так как оно будет передано в редусеры
//         });
//
//     @Effect({ dispatch: true })
//     registration$ = this.actions$
//         .ofType(C.TRYING_TO_REGISTRATION)
//         .switchMap(action => {
//             const user = action.payload.user;
//             const headers = new Headers({
//                 'Content-Type': 'application/json'
//             });
//             const options = new RequestOptions({
//                 headers,
//                 withCredentials: true
//             });
//             return this.http
//                 .post("api/regist", user, options)
//                 .map(action => {
//                     return createAction(C.SUCCESS_REGISTRATION);
//                 })
//                 .catch(action => Observable.of(createAction(C.COULD_NOT_REGISTRATION, action.json())));
//         });
//
//     @Effect({ dispatch: true})
//     successRegistration$ = this.actions$
//         .ofType(C.SUCCESS_REGISTRATION)
//         .map(res => this.router.navigate(['/dojo']));
//
//     @Effect({ dispatch: true })
//     couldNotGetResponseFromServer$ = this.actions$
//         .ofType(C.COULD_NOT_LOGIN, C.COULD_NOT_REGISTRATION, C.COULD_NOT_LOGOUT)
//         .map(action => createAction(C.SERVER_ERROR, action.payload));
//
//     @Effect({ dispatch: true })
//     serverError$ = this.actions$
//         .ofType(C.SERVER_ERROR)
//         .delay(5000)
//         .map(action => createAction(C.CLEAR_SERVER_ERROR));
//
// }