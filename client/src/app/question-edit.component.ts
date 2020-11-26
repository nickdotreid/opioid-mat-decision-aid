import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: QuestionEditComponent,
        multi: true
    }]
})
export class QuestionEditComponent implements ControlValueAccessor {

    public form: FormGroup;
    public error: String;

    public disabled: boolean;
    private onChange: Function;
    private onTouched: Function;

    constructor() {}

    public writeValue(data: any) {
        let label;
        let property;
        if (data && data.label) {
            label = data.label;
        }
        if (data && data.property) {
            property = data.property;
        }
        this.form = new FormGroup({
            label: new FormControl(label, Validators.required),
            property: new FormControl(property)
        });
        this.form.valueChanges.subscribe(() => {
            this.onChange({
                label: this.form.get('label').value,
                property: this.form.get('property').value
            });
        });
    }

    public registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    public setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }
}
