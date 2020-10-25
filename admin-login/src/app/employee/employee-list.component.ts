import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmployeeService } from '@app/_services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({ templateUrl: 'employee-list.component.html' })
export class EmployeeListComponent implements OnInit {
    employees = null;
    form: FormGroup;

    constructor(private employeeService: EmployeeService,private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.employeeService.getAll()
            .pipe(first())
            .subscribe(employees => this.employees = employees);
        this.form = this.formBuilder.group({               
                empFirstName: [''],
                empLastName: ['']
             });
    }

    deleteEmployee(id: string) {
        const user = this.employees.find(x => x.id === id);
        user.isDeleting = true;
        this.employeeService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.employees = this.employees.filter(x => x.id !== id) 
            });
    }
    onSearch(){
        this.employeeService.getAll(this.form.value)
        .pipe(first())
        .subscribe(employees => this.employees = employees);
       
    }
    onReset(){
        this.form.reset();
        this.employeeService.getAll()
        .pipe(first())
        .subscribe(employees => this.employees = employees);
    }
}