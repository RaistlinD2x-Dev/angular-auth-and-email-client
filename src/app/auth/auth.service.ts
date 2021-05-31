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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(false);
  authUrl = 'https://api.angular-email.com/auth';

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
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.authUrl}/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
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
}
