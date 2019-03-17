import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-choice-field',
    templateUrl: './choice-field.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ChoiceFieldComponent,
        multi: true
      }]
})
export class ChoiceFieldComponent implements ControlValueAccessor {

    private onChange: Function;
    private onTouch: Function;

    public isDisabled: boolean;

    public value: string;

    @Input('formControlName') formControlName: string;
    @Input('options') options: Array<string>;
    @Input('label') label: string;

    constructor() {}

    public writeValue(value: string) {
        this.value = value;
    }

    public updateValue(value: string) {
        this.value = value;
        this.onChange(value);
    }

    public registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    public setDisabledState(disabled: boolean) {
        this.isDisabled = disabled;
    }

}
