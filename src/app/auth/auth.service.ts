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
      .post<SignupResponse>(`${this.authUrl}/signup`, credentials, {
        withCredentials: true
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get(`${this.authUrl}/signedin`, {
      withCredentials: true
    })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      )
  }
}
