import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // no deja ir a otra parte a menos que estamos autenticados
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("Running Auth guard...");
    return this.authService.userIsAuthenticated.pipe(
      // redirect for not authenticated
      take(1),
      switchMap((isAuthenticated)=> {
        if(!isAuthenticated){
          console.log("no user authenticated");
          return this.authService.autoLogin();
        }
        console.log("nos quedamos aquí: userIsAuthenticated");
        return of(isAuthenticated);
      }),
      tap((isAuthenticated) => {
        if(!isAuthenticated)this.router.navigateByUrl('/auth');
      })
    );
  }
}
