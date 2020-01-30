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
            title: new FormControl(undefined, Validators.required)
        });
    }

    public create() {
        if (!this.form.invalid) {
            const title = this.form.get('title').value;
            this.chapterService.createChapter(title)
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

