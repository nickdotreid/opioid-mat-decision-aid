import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export class Choice {
    value: string;
    name: string;
}

@Component({
    selector: 'app-list-field',
    templateUrl: './list-field.component.html',
    styleUrls: ['./list-field.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ListFieldComponent,
        multi: true
      }]
})
export class ListFieldComponent implements ControlValueAccessor {

    private onChange: Function;
    private onTouch: Function;

    public isDisabled: boolean;

    public value: string;

    @Input('formControlName') formControlName: string;
    @Input('options') options: Array<Choice>;
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
