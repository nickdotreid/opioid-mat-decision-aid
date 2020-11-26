import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-button-edit',
    templateUrl: './button-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ButtonEditComponent,
        multi: true
    }]
})
export class ButtonEditComponent implements ControlValueAccessor {

    private label: string;

    public form: FormGroup;
    public error: String;

    private onChange: Function;
    private onTouch: Function;

    public disabled: boolean;

    constructor() {}

    private update() {
        this.form = new FormGroup({
            label: new FormControl(this.label, Validators.required)
        });
        this.form.valueChanges.subscribe(() => {
            this.change();
        });
    }

    private change() {
        if (this.form) {
            this.onChange({
                label: this.form.get('label').value
            });
        }
    }

    public writeValue(data: any) {
        if (data && data['label']) {
            this.label = data['label'];
        }
        this.update();
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
