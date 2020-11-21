import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, PageContent, PageService } from 'chapters/page.service';

@Component({
    'templateUrl': './content-edit.component.html'
})
export class ContentEditComponent {

    private page: Page;
    private pageContent: PageContent;

    public contentType: string;
    public form: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageService: PageService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params['contentId'] && params['pageId']) {
                this.pageService.get(params['pageId'])
                .then((page) => {
                    this.page = page;
                    return this.pageService.getPageContentItem(page.id, params['contentId']);
                })
                .then((pageContent) => {
                    this.update(pageContent);
                })
                .catch(() => {
                    this.close();
                });
            } else {
                this.close();
            }
        });
    }

    private update(pageContent: PageContent) {
        this.pageContent = pageContent;
        this.contentType = this.pageContent.contentType;
        this.form = new FormGroup({
            data: new FormControl(this.pageContent.data, Validators.required)
        });
    }

    public submit() {
        if (this.form && this.form.valid) {
            const updatedContent = new PageContent();
            updatedContent.id = this.pageContent.id;
            updatedContent.contentType = this.pageContent.contentType;
            updatedContent.published = this.pageContent.published;
            updatedContent.title = this.pageContent.title;
            updatedContent.data = this.form.get('data').value;
            this.pageService.updatePageContent(this.page, updatedContent)
            .then(() => {
                this.close();
            });
        }
    }

    public close() {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
