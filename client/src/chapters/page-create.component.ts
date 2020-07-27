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
    public page: Page;
    public chapter: Chapter;

    private updateLabel = 'Update';
    private createLabel = 'Create';
    public submitLabel: string;

    constructor(
        private pageService: PageService,
        private dialog: MatDialogRef<PageCreateComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let title;
        if (data && data.chapter) {
            this.chapter = data.chapter;
        }
        if (data && data.page) {
            this.page = data.page;
            title = this.page.title;
            this.submitLabel = this.updateLabel;
        } else {
            this.submitLabel = this.createLabel;
        }

        this.form = new FormGroup({
            title: new FormControl(title, Validators.required)
        });
    }

    public submit() {
        if (!this.form.invalid) {
            const title = this.form.get('title').value;
            let promise;
            if (this.page) {
                this.page.title = title;
                promise = this.pageService.update(this.page);
            } else {
                promise = this.pageService.create(this.chapter.id, title);
            }
            promise.then(() => {
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

