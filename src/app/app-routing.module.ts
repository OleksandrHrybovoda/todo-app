import { NgModule } from '@angular/core';
import { RouterModule , PreloadAllModules, ExtraOptions} from '@angular/router';
import { routes } from './core/route-definitions/root-routes';

const extraOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
};
@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
