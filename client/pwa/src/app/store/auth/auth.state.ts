import { State, Action, StateContext } from '@ngxs/store';
import { LoginAction, RegistrationAction } from './auth.actions';
import { AuthStateModel } from './auth.models';
import { AuthService } from '../../shared/auth/auth.service';


let state = {
  name: 'auth',
  defaults: {
    user: null
  }
};


@State<AuthStateModel>(state)
export class AuthState {
  constructor(
    private authService: AuthService,
  ) {}

  @Action(LoginAction)
  async login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    let data: any = await this.authService.login(action.user);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: data.user
    });
  }

  @Action(RegistrationAction)
  async registration(ctx: StateContext<AuthStateModel>, action: RegistrationAction) {
    const data: any = await this.authService.registration(action.user);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: data.user
    });
  }
}
