import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BooleanFieldComponent } from './boolean-field.component';
import { MatRadioModule } from '@angular/material';



@NgModule({
    declarations: [
        BooleanFieldComponent
    ],
    imports: [
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BooleanFieldComponent
    ]
})
export class FormModule {}
