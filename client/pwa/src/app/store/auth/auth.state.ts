import { State, Action, StateContext } from '@ngxs/store';
import { LoginAction } from './auth.actions';
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
    const {user, token} = await this.authService.login(action.user);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      user
    });
  }
}
