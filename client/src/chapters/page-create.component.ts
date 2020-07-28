import { Component, Inject } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page, PageService } from './page.service';


@Component({
    templateUrl: './page-create.component.html'
})
export class PageCreateComponent {

    public form: FormGroup;
    public error: String;

    constructor(
        private dialog: MatDialogRef<PageCreateComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let title;
        let published = true;
        if (data) {
            title = data.title;
            published = data.published;
            this.error = data.error;
        }

        this.form = new FormGroup({
            title: new FormControl(title, Validators.required),
            published: new FormControl(published, Validators.required)
        });
    }

    public submit() {
        if (!this.form.invalid) {
            const title = this.form.get('title').value;
            const published = this.form.get('published').value;
            this.dialog.close({
                title: title,
                published: published
            });
        } else {
            this.error = 'Form is invalid';
        }
    }
}

