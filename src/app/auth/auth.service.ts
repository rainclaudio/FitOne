import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Plugins } from '@capacitor/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string; // lo que se demora en subscribirse
  localId: string; // user id
  expiresIn: string;
  registered?: boolean; // está registtrado o no, esto es opcional ya que en sign in no lo necesitamos
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  // !! means that were forcind token to be a boolean type
  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          console.log('tenemos token en auth service!');
          return user.token;
        } else {
          return null;
        }
      })
    );
  }
  autoLogin() {
    return from(
      Plugins.Storage.get({
        key: 'authData',
      })
    ).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        // string to storedData
        const paredData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(paredData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          paredData.userId,
          paredData.email,
          paredData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }
  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        }
        return false;
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) return user.id;
        return null;
      })
    );
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
      { email: email, password: password, returnSecureToken: true }
    )
    .pipe(tap(this.setUserData.bind(this)));
  }
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
        { email: email, password: password, returnSecureToken: true }
        //pipe se ejecuta luego de subscribe
      )
      .pipe(tap(this.setUserData.bind(this)));
  }
  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }
  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
  private setUserData(userData: AuthResponseData) {
    // en set user data finalmente estamos subscribiendo al cliente.
    const expirationDate = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationDate
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationDate.toISOString(),
      userData.email
    );
  }
  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email,
    });
    Plugins.Storage.set({
      key: 'authData',
      value: data,
    });
  }
}
