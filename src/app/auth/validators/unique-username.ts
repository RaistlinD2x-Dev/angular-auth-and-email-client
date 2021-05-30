import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';
import {  map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient){}

    validate = (control: FormControl) => {
        const url = 'https://api.angular-email.com/auth/username';
        const { value } = control;

        return this.http.post<any>(url, { 
            username: value
        }).pipe(
            map(() => {
                return null;
            }),
            catchError((err) => {
                if(err.error.username) {
                    return of({ nonUniqueUsername: true });
                }
                return of({ noConnection: true });
            })
        )
    }
}
