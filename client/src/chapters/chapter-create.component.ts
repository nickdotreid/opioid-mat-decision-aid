import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChapterService, Chapter } from './chapters.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    'selector': 'app-chapter-create',
    'templateUrl': './chapter-create.component.html'
})
export class ChapterCreateComponent {

    public form: FormGroup;
    public chapter: Chapter;

    public submitButtonLabel: string;

    constructor(
        public dialog: MatDialogRef<ChapterCreateComponent>,
        private chapterService: ChapterService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        let defaultTitle: string;
        if (data && data.chapter) {
            this.chapter = data.chapter;
            defaultTitle = this.chapter.title;
            this.submitButtonLabel = 'Update';
        } else {
            this.submitButtonLabel = 'Create';
        }

        this.form = new FormGroup({
            title: new FormControl(defaultTitle, Validators.required)
        });
    }

    public submit() {
        if (this.form.valid) {
            const title = this.form.get('title').value;
            let promise: Promise<Chapter>;
            if (this.chapter) {
                this.chapter.title = title;
                promise = this.chapterService.updateChapter(this.chapter);
            } else {
                promise = this.chapterService.createChapter(title);
            }
            promise.then(() => {
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

