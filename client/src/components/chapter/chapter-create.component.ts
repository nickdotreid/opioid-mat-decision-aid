import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ChapterService } from './chapters.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    'selector': 'app-chapter-create',
    'templateUrl': './chapter-create.component.html'
})
export class ChapterCreateComponent {

    public form: FormGroup;

    constructor(
        public dialog: MatDialogRef<ChapterCreateComponent>,
        private chapterService: ChapterService
    ) {
        this.form = new FormGroup({
            slug: new FormControl(undefined, Validators.required),
            title: new FormControl(undefined, Validators.required)
        });
    }

    public create() {
        if (!this.form.invalid) {
            const slug = this.form.get('slug').value;
            const title = this.form.get('title').value;
            this.chapterService.createChapter(slug, title)
            .then(() => {
                this.dialog.close();
            })
            .catch((error) => {
                console.error('Chapter create component', error);
            });
        } else {
            console.log('form is invalid...');
        }
    }

    public close() {
        this.dialog.close();
    }

}
