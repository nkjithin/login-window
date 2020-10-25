import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Employee } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
       
    }

                    
    register(employee: Employee) {
        return this.http.post(`${environment.apiUrl}/employee/add`, employee);
    }
    
    getAll(objSearch=null) {
        return this.http.post<Employee[]>(`${environment.apiUrl}/employee`,objSearch);
    }

    getById(id: string) {
        return this.http.get<Employee>(`${environment.apiUrl}/employee/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/employee/${id}`, params)
            .pipe(map(x => {                
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {                
                return x;
            }));
    }
}