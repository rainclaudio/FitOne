import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'xyz';

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  constructor(private http: HttpClient) {}

  login() {
    this._userIsAuthenticated = true;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      ` https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseAPIkey
      }`,
      { email: email, password: password, returnSecureToken: true }
    );
  }
  logout() {
    this._userIsAuthenticated = false;
  }
}
