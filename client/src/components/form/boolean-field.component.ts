import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-boolean-field',
    templateUrl: './boolean-field.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: BooleanFieldComponent,
        multi: true
      }]
})
export class BooleanFieldComponent implements ControlValueAccessor {

    @Input('label') label: string;

    public value: boolean;
    public disabled: boolean;

    private onChange: Function;
    private onTouch: Function;

    constructor() {}

    public update(value: boolean) {
        this.onChange(value);
        this.onTouch();
    }

    public writeValue(value) {
        this.value = value;
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {
        this.onTouch = fn;
    }

    public setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

}
