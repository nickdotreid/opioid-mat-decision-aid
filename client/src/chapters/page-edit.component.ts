import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-edit',
    templateUrl: './page-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: PageEditComponent,
        multi: true
    }]
})
export class PageEditComponent implements ControlValueAccessor {

    public form: FormGroup;
    public error: String;

    public disabled: boolean;
    private onChange: Function;
    private onTouched: Function;

    constructor() {
        console.log('Page edit component');
    }

    public writeValue(data: any) {
        let title;
        let published;
        console.log(data);
        if (data && data.title) {
            title = data.title;
        }
        if (data && data.published !== undefined) {
            published = data.published;
        }
        this.form = new FormGroup({
            title: new FormControl(title, Validators.required),
            published: new FormControl(published)
        });
        this.form.valueChanges.subscribe(() => {
            this.onChange({
                title: this.form.get('title').value,
                published: this.form.get('published').value
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
