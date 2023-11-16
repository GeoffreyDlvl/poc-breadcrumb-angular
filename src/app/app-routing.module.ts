import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GrandchildComponent } from './grandchild/grandchild.component';
import { delay, map, of } from 'rxjs';

const childRoutes: Routes = [
  {
    path: 'child',
    loadComponent: () =>
      import('./child/child.component').then((m) => m.ChildComponent),
    resolve: {
      breadcrumb: (
        _route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) => {
        console.log('resolve child, async');
        return of('child').pipe(
          delay(3000),
          map((result) => ({
            label: result,
            url: state.url,
          }))
        );
      },
    },
  },
];

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      breadcrumb: (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) => {
        console.log('resolve home');
        return {
          label: 'home',
          url: route.url.join('/'),
        };
      },
    },
    loadChildren: () => childRoutes,
  },
  {
    path: 'home/child/grandchild',
    component: GrandchildComponent,
    resolve: {
      breadcrumb: (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) => {
        console.log('resolve grandchild');
        return {
          label: 'grandchild',
          url: route.url.join('/'),
        };
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
