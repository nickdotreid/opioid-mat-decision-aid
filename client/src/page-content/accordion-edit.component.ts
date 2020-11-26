import { Component, Inject } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageContent } from 'chapters/page.service';
import { ButtonEditComponent } from './button-edit.component';


@Component({
    selector: 'app-accordion-edit',
    templateUrl: './accordion-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: AccordionEditComponent,
        multi: true
      }]
})
export class AccordionEditComponent implements ControlValueAccessor {

    private data: any;

    public error: String;

    public items: Array<FormGroup>;

    private onChange: Function;
    private onTouch: Function;

    public disabled: boolean;

    constructor() {}

    private update() {
        let data = {};
        if (this.data) {
            data = this.data;
        }

        this.items = [];
        if (data && data['items'] && Array.isArray(data['items'])) {
            data['items'].forEach((_item) => {
                this.addItemGroup(_item['title'], _item['text']);
            });
        }
    }

    private change() {
        const itemValues = this.items.map((itemFormGroup) => {
            return itemFormGroup.value;
        });
        this.onChange({
            'items': itemValues
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

    public addItemGroup(title, text) {
        const itemGroup = new FormGroup({
            title: new FormControl(title, Validators.required),
            text: new FormControl(text, Validators.required)
        });
        itemGroup.valueChanges.subscribe(() => {
            this.change();
        });
        this.items.push(itemGroup);
    }
}
