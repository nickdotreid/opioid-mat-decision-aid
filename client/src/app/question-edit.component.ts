import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent {

    public form: FormGroup;
    public error: String;

    constructor(
        private dialog: MatDialogRef<QuestionEditComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
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
    }

    public submit() {
        if (this.form.valid) {
            this.dialog.close({
                label: this.form.get('label').value,
                property: this.form.get('property').value
            });
        } else {
            this.error = 'Form is invalid';
        }
    }
}
