import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'https://api.angular-email.com/auth'

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailabelResponse>(
      `${this.authUrl}/username`, { 
      username
    })
  }


  signup(credentials: SignUp) {
    return this.http.post<SignupResponse>(
      `${this.authUrl}/signup`, 
        credentials
      )
  }
}
