import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmployeeService } from '@app/_services';

@Component({ templateUrl: 'employee-add-edit.component.html' })
export class EmployeeAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            empCode:['',Validators.required],
            empFirstName: ['', Validators.required],
            empLastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', passwordValidators]
        });

        if (!this.isAddMode) {
            this.employeeService.getById(this.id)
                .pipe(first())
                .subscribe(x => {                    
                    this.f.empCode.setValue(x.empCode);
                    this.f.empFirstName.setValue(x.empFirstName);
                    this.f.empLastName.setValue(x.empLastName);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEmployee();
        } else {
            this.updateEmployee();
        }
    }

    private createEmployee() {
        this.employeeService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.loading = false;
                });
    }

    private updateEmployee() {
        this.employeeService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.loading = false;
                });
    }
}