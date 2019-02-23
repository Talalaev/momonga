export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public user?: any) {}
}

export class RegistrationAction {
  static readonly type = '[Auth] Registration';

  constructor(public user?: any) {}
}
