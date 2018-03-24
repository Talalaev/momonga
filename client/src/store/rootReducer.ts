import * as reducers from './reducers';

export const rootReducer = {
    dojoState: reducers.dojoState,
    isLoggedIn: reducers.isLoggedIn,
    tryingToLogin: reducers.tryingToLogin,
    tryingToLogout: reducers.tryingToLogout,
    user: reducers.user,
    serverError: reducers.serverError
};