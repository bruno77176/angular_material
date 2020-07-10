import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router'
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
      return this.store.pipe(select(fromRoot.getIsAuthenticated)).pipe(take(1));

    }

    canLoad(route: Route) {
      return this.store.pipe(select(fromRoot.getIsAuthenticated)).pipe(take(1));
    }
}
