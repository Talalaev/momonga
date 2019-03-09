import { State, Action, StateContext } from '@ngxs/store';
import { LoginAction, RegistrationAction, LogoutAction, SetAuthUser } from './auth.actions';
import { AuthStateModel } from './auth.models';
import { AuthService } from '../auth.service';


let state = {
  name: 'auth',
  defaults: {
    user: null,
    isAuth: false
  }
};


@State<AuthStateModel>(state)
export class AuthState {
  constructor(
    private authService: AuthService,
  ) {}

  @Action(LoginAction)
  async login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    let data: {user: any, token: string} = await this.authService.login(action.user);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: data.user,
      isAuth: true
    });
  }

  @Action(RegistrationAction)
  async registration(ctx: StateContext<AuthStateModel>, action: RegistrationAction) {
    const data: {user: any, token: string} = await this.authService.registration(action.user);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: data.user,
      isAuth: true
    });
  }

  @Action(LogoutAction)
  async loguot(ctx: StateContext<AuthStateModel>) {
    await this.authService.logout();

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: null,
      isAuth: false
    });
  }

  @Action(SetAuthUser)
  async setAuthUser(ctx: StateContext<AuthStateModel>) {
    const user: any = await this.authService.getAuthUser();

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user,
      isAuth: Boolean(user)
    });
  }
}
