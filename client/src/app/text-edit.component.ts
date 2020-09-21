import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './text-edit.component.html'
})
export class TextEditComponent {

    public form: FormGroup;
    public error: String;

    @ViewChild('editor') editor: ElementRef;

    constructor(
        private dialog: MatDialogRef<TextEditComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let text;
        if (data && data.text) {
            text = data.text;
        }
        this.form = new FormGroup({
            text: new FormControl(text)
        });
    }

    public submit() {

        if (this.form.valid) {
            this.dialog.close({
                text: this.form.get('text').value
            });
        } else {
            this.error = 'Form is invalid';
        }
    }

}
