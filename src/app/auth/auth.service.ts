import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://api.angular-email.com/auth/username';

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(this.url, { 
      username
    })
  }
}
