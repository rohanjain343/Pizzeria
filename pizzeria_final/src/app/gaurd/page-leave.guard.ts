import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { iLeave } from '../shared/models/Ileave';

@Injectable({
  providedIn: 'root'
})
export class PageLeaveGuard implements CanDeactivate<iLeave> {
  canDeactivate(
    component: iLeave,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!component.canLeave()) {
        if(confirm('do you really dont want delicious pizza to be added in cart?')) {
          return true;
        }
        return false;
      }
    return true;
  }
  
}
