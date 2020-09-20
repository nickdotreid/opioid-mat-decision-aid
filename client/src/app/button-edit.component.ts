import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './button-edit.component.html'
})
export class ButtonEditComponent {

    public form: FormGroup;
    public error: String;

    constructor(
        private dialog: MatDialogRef<ButtonEditComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let label;
        if (data && data.label) {
            label = data.label;
        }

        this.form = new FormGroup({
            label: new FormControl(label, Validators.required)
        });
    }

    public submit() {
        if (this.form.valid) {
            this.dialog.close({
                label: this.form.get('label').value
            });
        } else {
            this.error = 'Form is invalid';
        }
    }
}
