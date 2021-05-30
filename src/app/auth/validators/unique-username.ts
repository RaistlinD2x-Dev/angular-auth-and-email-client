import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient){}

    validate = (control: FormControl) => {
        const url = 'https://api.angular-email.com/auth/username';
        const { value } = control;
        
        return this.http.post<any>(url, { 
            username: value
        })
    }
}
