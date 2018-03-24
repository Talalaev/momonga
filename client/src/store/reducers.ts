import { Action } from '@ngrx/store';
import C from './constants';

export function dojoState(state: boolean = true, action: Action): boolean {
    switch (action.type) {
        case C.OPEN_DOJO:
            return true;
        case C.CLOSE_DOJO:
            return false;
        default:
            return state;
    }
}

export function isLoggedIn(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case C.LOGIN:
        case C.SUCCESS_REGISTRATION:
            return true;
        case C.LOGOUT:
            return false;
        default:
            return state;
    }
}

export function tryingToLogin(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case C.TRYING_TO_LOGIN:
            return true;
        case C.LOGIN:
        case C.COULD_NOT_LOGIN:
            return false;
        default:
            return state;
    }
}

export function tryingToLogout(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case C.TRYING_TO_LOGOUT:
            return true;
        case C.LOGOUT:
        case C.COULD_NOT_LOGOUT:
            return false;
        default:
            return state;
    }
}

export function tryingToRegistration(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case C.TRYING_TO_REGISTRATION:
            return true;
        case C.SUCCESS_REGISTRATION:
        case C.COULD_NOT_REGISTRATION:
            return false;
        default:
            return state;
    }
}

export function user(state: {} = {}, action: Action): Object {
    switch (action.type) {
        case C.LOGIN:
        case C.SUCCESS_REGISTRATION:
            return { ...state, ...action.payload };
        case C.LOGOUT:
            return {};
        default:
            return state;
    }
}

export function serverError(state: ServerError = {status: null, msgs: []}, action: Action): ServerError {
    switch (action.type) {
        case C.SERVER_ERROR:
            console.log(action.payload);
            return { ...action.payload };
        case C.CLEAR_SERVER_ERROR:
            return {
                status: null,
                msgs: []
            };
        default:
            return state;
    }
}