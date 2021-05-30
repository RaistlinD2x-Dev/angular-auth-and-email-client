import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient){}

    validate = (control: FormControl) => {
        const { value } = control;
        console.log(this.http);
        return null;
    }
}
