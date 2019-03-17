import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BooleanFieldComponent } from './boolean-field.component';
import { MatRadioModule } from '@angular/material';
import { ChoiceFieldComponent } from './choice-field.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [
        BooleanFieldComponent,
        ChoiceFieldComponent
    ],
    imports: [
        BrowserModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BooleanFieldComponent,
        ChoiceFieldComponent
    ]
})
export class FormModule {}
