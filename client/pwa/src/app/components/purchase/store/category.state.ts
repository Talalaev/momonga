import { State, Action, StateContext } from '@ngxs/store';
import { CategoryService } from '../services/category.service';
import { GetCategoryAction } from './category.actions';
import { CategoryStateModel } from './category.models';


let state = {
  name: 'category',
  defaults: {
    categories: []
  }
};


@State<CategoryStateModel>(state)
export class CategoryState {
  constructor(
    private categoryService: CategoryService,
  ) {}

  @Action(GetCategoryAction)
  async getCategories(ctx: StateContext<CategoryStateModel>, action: GetCategoryAction) {
    let categories = await this.categoryService.getCategories();

    ctx.setState({
      categories
    });
  }
}
