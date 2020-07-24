import { Component, Inject } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    templateUrl: './page-create.component.html'
})
export class PageCreateComponent {

    public form: FormGroup;
    public chapter: Chapter;

    constructor(
        private chapterService: ChapterService,
        private dialog: MatDialogRef<PageCreateComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        if (data && data.chapter) {
            this.chapter = data.chapter;
        }
        this.form = new FormGroup({
            title: new FormControl(undefined, Validators.required)
        });
    }

    public create() {
        if (!this.form.invalid) {
            const title = this.form.get('title').value;
            this.chapterService.createPage(this.chapter, title)
            .then(() => {
                this.dialog.close();
            })
            .catch((error) => {
                console.error('Page create component', error);
            });
        } else {
            console.error('Page create component', 'form is invalid');
        }
    }
}

