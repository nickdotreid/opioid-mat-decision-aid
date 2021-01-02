import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, ChapterService } from 'chapters/chapters.service';
import { Page, PageContent, PageService } from 'chapters/page.service';
import { ContentService } from './content.service';

@Component({
    'templateUrl': './content-edit.component.html'
})
export class ContentEditComponent {

    private parentContent: PageContent;
    private content: PageContent;

    private page: Page;
    private pageContent: PageContent;

    public contentType: string;
    public form: FormGroup;

    public create: Boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageService: PageService,
        private chapterService: ChapterService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params['pageId']) {
                this.pageService.get(params['pageId'])
                .then((page) => {
                    this.page = page;
                    if (params['contentId']) {
                        return this.pageService.getPageContentItem(this.page.id, params['contentId'])
                        .then((pageContent) => {
                            this.update(pageContent);
                        });
                    } else if (params['contentType']) {
                        const pageContent = new PageContent();
                        pageContent.title = params['contentType'];
                        pageContent.contentType = params['contentType'];
                        this.update(pageContent);
                    } else {
                        return Promise.reject('Unknow parameters');
                    }
                })
                .catch(() => {
                    const currentPage = this.chapterService.currentPage.getValue();
                    if (currentPage) {
                        this.page = currentPage;
                        return this.pageService.getPageContentItem(this.page.id, params['pageId'])
                        .then((content) => {
                            this.parentContent = content;
                            if (params['contentType']) {
                                const pageContent = new PageContent();
                                pageContent.title = params['contentType'];
                                pageContent.contentType = params['contentType'];
                                this.update(pageContent);
                            }
                        });
                    } else {
                        return Promise.reject('No current page');
                    }
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

            if (updatedContent.id) {
                this.pageService.updatePageContent(this.page, updatedContent)
                .then(() => {
                    this.close();
                });
            } else {
                this.pageService.createPageContent(this.page, updatedContent)
                .then(() => {
                    this.close();
                });
            }
        }
    }

    public close() {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
