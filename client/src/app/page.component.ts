import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page, PageService, PageContent } from 'chapters/page.service';

@Component({
    templateUrl: './page.component.html'
})
export class PageComponent implements OnDestroy {

    public page: Page;
    public pageContents: Array<PageContent> = [];
    public isEditable: boolean;

    private routeSubscription: Subscription;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute
    ) {
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data.page) {
                this.page = data.page;
                this.pageService.getPageContent(this.page)
                .then((contents) => {
                    this.pageContents = contents;
                })
                .catch(() => {
                    this.pageContents = [];
                });
            } else {
                this.page = undefined;
                this.pageContents = [];
            }
            if (data.isEditable) {
                this.isEditable = true;
            } else {
                this.isEditable = false;
            }
        });
    }

    private createPageContent(contentType, data) {
        if (this.page) {
            this.pageService.createPageContent(this.page, contentType, data)
            .then(() => {
                return this.pageService.getPageContent(this.page);
            })
            .then((contents) => {
                this.pageContents = contents;
            });
        } else {
            console.error('No page to add content to');
        }
    }

    public addText() {
        this.createPageContent('text', {});
    }

    public addButton() {
        this.createPageContent('button', {
            text: 'Example Text'
        });
    }

    public addQuestion() {
        this.createPageContent('question', {});
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
