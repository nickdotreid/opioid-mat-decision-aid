import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Sortable } from '@shopify/draggable';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray } from '@angular/forms';

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: QuestionEditComponent,
        multi: true
    }]
})
export class QuestionEditComponent implements ControlValueAccessor, AfterViewInit {

    public form: FormGroup;
    public error: String;

    public optionFormGroups: Array<FormGroup> = [];
    @ViewChild('options') list: ElementRef;

    public disabled: boolean;
    private onChange: Function;
    private onTouched: Function;

    public formatOptions = [
        {
            name: 'Checkboxes',
            value: 'checkbox'
        },
        {
            name: 'Radio Buttons',
            value: 'radio'
        }
    ];

    constructor() {}

    ngAfterViewInit() {
        const sorter = new Sortable(this.list.nativeElement, {
            draggable: 'li'
        });
        sorter.on('sortable:sorted', (event) => {
            const options = this.optionFormGroups.map(fg => fg);
            const moved = options[event.oldIndex];
            options.splice(event.oldIndex, 1);
            options.splice(event.newIndex, 0, moved);
            this.optionFormGroups = options;
            this.changeValues();
        });
    }

    public writeValue(data: any) {
        let label;
        let format;
        if (data && data.label) {
            label = data.label;
        }
        if (data && data.format) {
            format = data.format;
        }
        if (data && data.options && Array.isArray(data.options)) {
            data.options.forEach((option) => {
                this.addOption(option);
            });
        }
        this.form = new FormGroup({
            label: new FormControl(label, Validators.required),
            format: new FormControl(format, Validators.required),
        });
        this.form.valueChanges.subscribe(() => {
            this.changeValues();
        });
    }

    private changeValues() {
        this.onChange({
            label: this.form.get('label').value,
            format: this.form.get('format').value,
            options: this.optionFormGroups.map((optionFG) => {
                return optionFG.get('label').value;
            })
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

    public addOption(optionLabel) {
        const formGroup = new FormGroup({
            label: new FormControl(optionLabel, Validators.required)
        });
        formGroup.valueChanges.subscribe(() => {
            this.changeValues();
        });
        this.optionFormGroups.push(formGroup);
    }

    public removeOption(index) {
        this.optionFormGroups.splice(index, 1);
        this.changeValues();
    }
}
