import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextFieldComponent } from './text-field.component';


@Component({
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: PasswordFieldComponent,
        multi: true
      }],
    template: `
        <app-field [label]="label">
            <mat-form-field>
                <input matInput [ngModel]="value" (ngModelChange)="valueChange($event)" type="password" />
            </mat-form-field>
        </app-field>
    `,
    selector: 'app-password-field'
})
export class PasswordFieldComponent extends TextFieldComponent implements ControlValueAccessor {}
