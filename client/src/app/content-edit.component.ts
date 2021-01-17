import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'chapters/chapters.service';
import { Page, PageContent, PageService } from 'chapters/page.service';
import { isArray } from 'util';

@Component({
    'templateUrl': './content-edit.component.html'
})
export class ContentEditComponent {

    private parentContent: PageContent;
    private content: PageContent;
    private contentPage: Page;

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
                            if (params['contentId']) {
                                return this.pageService.get(params['contentId'])
                                .then((page) => {
                                    this.editPage(page);
                                });
                            } else if (params['contentType']) {
                                if (params['contentType'] === 'page') {
                                    this.showAddPage();
                                } else {
                                    const pageContent = new PageContent();
                                    pageContent.title = params['contentType'];
                                    pageContent.contentType = params['contentType'];
                                    this.update(pageContent);
                                }
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

    private editPage(page: Page) {
        console.log('Show edit page', page);
        this.contentType = 'page';
        this.form = new FormGroup({
            page: new FormControl(page, Validators.required)
        });
    }

    private showAddPage() {
        this.contentType = 'page';
        this.form = new FormGroup({
            page: new FormControl(new Page(), Validators.required)
        });
    }

    public submit() {
        if (this.contentType === 'page') {
            if (this.form && this.form.valid) {
                const _page = this.form.get('page').value;
                this.pageService.createSinglePage(
                    _page.title,
                    _page.published
                ).then((page: Page) => {
                    console.log('Created page', page);
                    console.log('Has partent content', this.parentContent);
                    if (this.parentContent) {
                        if (this.parentContent.data) {
                            if (this.parentContent.data.pages && isArray(this.parentContent.data.pages)) {
                                this.parentContent.data.pages.push(page);
                            } else {
                                this.parentContent.data.pages = [page];
                            }
                        } else {
                            this.parentContent.data = {
                                pages: [page]
                            };
                        }
                        this.pageService.updatePageContent(this.page, this.parentContent)
                        .then(() => {
                            this.close();
                        });
                    }
                });
            }
        } else if (this.form && this.form.valid) {
            const updatedContent = new PageContent();
            updatedContent.id = this.pageContent.id;
            updatedContent.contentType = this.pageContent.contentType;
            updatedContent.published = this.pageContent.published;
            updatedContent.title = this.pageContent.title;
            updatedContent.data = this.form.get('data').value;

            let _promise;
            if (updatedContent.id) {
                _promise = this.pageService.updatePageContent(this.page, updatedContent);
            } else {
                _promise = this.pageService.createPageContent(this.page, updatedContent);
            }

            _promise.then(() => {
                this.close();
            });
        }
    }

    public close() {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
