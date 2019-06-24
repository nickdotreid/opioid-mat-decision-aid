import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BooleanFieldComponent } from './boolean-field.component';
import { MatRadioModule, MatCheckboxModule } from '@angular/material';
import { ChoiceFieldComponent } from './choice-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { ListFieldComponent } from './list-field.component';



@NgModule({
    declarations: [
        BooleanFieldComponent,
        ChoiceFieldComponent,
        ListFieldComponent
    ],
    imports: [
        BrowserModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BooleanFieldComponent,
        ChoiceFieldComponent,
        ListFieldComponent
    ]
})
export class FormModule {}
