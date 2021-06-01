import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailabelResponse {
  available: boolean;
}

interface SignupResponse {
  username: string;
}

interface SignUp {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(null);
  authUrl = 'https://api.angular-email.com/auth';
  username = '';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailabelResponse>(
      `${this.authUrl}/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignUp) {
    return this.http
      .post<SignupResponse>(`${this.authUrl}/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.authUrl}/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      )
  }

  signout() {
    return this.http.post(`${this.authUrl}/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${this.authUrl}/signin`, credentials)
      .pipe(
        tap(( { username }) => {
          this.signedin$.next(true)
          this.username = username
        })
      )
  }


}
