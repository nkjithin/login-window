import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LayoutComponent } from './layout.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmployeeRoutingModule
    ],
    declarations: [
        LayoutComponent,
        EmployeeListComponent,
        EmployeeAddEditComponent
    ]
})
export class EmployeeModule { }