import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ButtonEditComponent } from './button-edit.component';


@Component({
    templateUrl: './accordion-edit.component.html'
})
export class AccordionEditComponent {

    public form: FormGroup;
    public error: String;

    public items: Array<FormGroup>;

    constructor(
        private dialog: MatDialogRef<ButtonEditComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let title;
        if (data && data['title']) {
            title = data['title'];
        }
        this.form = new FormGroup({
            title: new FormControl(title)
        });

        this.items = [];
        if (data && data['items'] && Array.isArray(data['items'])) {
            data['items'].forEach((_item) => {
                this.addItemGroup(_item['title'], _item['text']);
            });
        }
    }

    public addItemGroup(title, text) {
        const itemGroup = new FormGroup({
            title: new FormControl(title, Validators.required),
            text: new FormControl(text, Validators.required)
        });
        this.items.push(itemGroup);
    }

    private areItemFormsValid() {
        let valid = true;
        this.items.forEach((itemForm) => {
            if (!itemForm.valid) {
                valid = false;
            }
        });
        return valid;
    }

    public submit() {
        if (this.areItemFormsValid()) {
            const items = this.items.map((_item) => {
                return {
                    title: _item.get('title').value,
                    text: _item.get('text').value
                };
            });
            this.dialog.close({
                items: items
            });
        }
    }
}
