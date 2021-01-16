import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, PageService } from 'chapters/page.service';


@Component({
    'templateUrl': './page-edit.component.html'
})
export class PageEditComponent {

    public form: FormGroup;
    public error: String;

    private page: Page;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageService: PageService,
        private router: Router
    ) {
        this.activatedRoute.data.subscribe((data) => {
            if (data.page) {
                const page = new Page();
                page.id = data.page.id;
                page.published = data.page.published;
                page.title = data.page.title;
                this.page = page;
            } else {
                this.page = new Page();
            }
            this.update();
        });
    }

    private update() {
        let title = '';
        let published = false;
        if (this.page) {
            title = this.page.title;
            published = this.page.published;
        }
        this.form = new FormGroup({
            title: new FormControl(title, Validators.required),
            published: new FormControl(published, Validators.required)
        });
    }

    private save(): Promise<Page> {
        if (this.page.id) {
            return this.pageService.update(this.page);
        } else {
            return this.pageService.createSinglePage(
                this.page.title,
                this.page.published
            );
        }
    }

    public submit() {
        if (this.form.valid) {
            this.page.title = this.form.get('title').value;
            this.page.published = this.form.get('published').value;
            this.save().then(() => {
                this.close();
            });
        } else {
            this.error = 'Please fix errors';
        }
    }

    public close() {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
