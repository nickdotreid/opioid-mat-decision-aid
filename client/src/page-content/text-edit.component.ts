import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-text-edit',
    templateUrl: './text-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextEditComponent,
        multi: true
    }]
})
export class TextEditComponent implements ControlValueAccessor {

    private data: any;

    public form: FormGroup;
    public error: String;
    public disabled: boolean;

    private onChange: Function;
    private onTouch: Function;

    @ViewChild('editor') editor: ElementRef;

    constructor() {

    }

    private update() {
        let text;
        if (this.data && this.data.text) {
            text = this.data.text;
        }
        this.form = new FormGroup({
            text: new FormControl(text)
        });
        this.form.valueChanges.subscribe(() => {
            this.change();
        });
    }

    private change() {
        this.onChange({
            text: this.form.get('text').value
        });
    }

    public writeValue(value) {
        this.data = value;
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

    public submit() {
        this.change();
    }

}
