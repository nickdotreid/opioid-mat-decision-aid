import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextFieldComponent,
        multi: true
      }],
    'selector': 'app-text-field',
    'template': `
        <app-field [label]="label">
            <mat-form-field>
                <input matInput [ngModel]="value" (ngModelChange)="valueChange($event)" type="text" />
            </mat-form-field>
        </app-field>
    `,
})
export class TextFieldComponent implements ControlValueAccessor {

    @Input('label') label: string;

    public value: string;
    public disabled: boolean;

    private onChange: Function;
    private onTouch: Function;

    constructor() {}

    public valueChange(newValue) {
        this.value = newValue;
        this.updateValue();
    }

    public updateValue() {
        this.onChange(this.value);
        this.onTouch();
    }

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
