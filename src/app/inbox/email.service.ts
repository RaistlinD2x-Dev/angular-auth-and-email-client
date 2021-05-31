import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailUrl: string = 'https://api.angular-email.com/emails'

  constructor(private http: HttpClient) { }
}
