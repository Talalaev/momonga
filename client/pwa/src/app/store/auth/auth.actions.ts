export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public user?: any) {}
}
