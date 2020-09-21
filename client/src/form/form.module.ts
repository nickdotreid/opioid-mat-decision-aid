import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BooleanFieldComponent } from './boolean-field.component';
import { MatRadioModule, MatCheckboxModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ChoiceFieldComponent } from './choice-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { ListFieldComponent } from './list-field.component';
import { FieldComponent } from './field.component';
import { TextFieldComponent } from './text-field.component';
import { PasswordFieldComponent } from './password-field.component';
import { RichTextEditorComponent } from './rich-text-editor.component';



@NgModule({
    declarations: [
        BooleanFieldComponent,
        ChoiceFieldComponent,
        FieldComponent,
        ListFieldComponent,
        PasswordFieldComponent,
        RichTextEditorComponent,
        TextFieldComponent
    ],
    imports: [
        BrowserModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BooleanFieldComponent,
        ChoiceFieldComponent,
        FieldComponent,
        ListFieldComponent,
        PasswordFieldComponent,
        RichTextEditorComponent,
        TextFieldComponent
    ]
})
export class FormModule {}
