import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page, PageService, PageContent } from 'chapters/page.service';
import { MatDialog } from '@angular/material';
import { PageCreateComponent } from 'chapters/page-create.component';
import { Button } from 'protractor';
import { ButtonEditComponent } from './button-edit.component';
import { TextEditComponent } from './text-edit.component';

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
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data.page) {
                this.page = data.page;
                this.updateContent();
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

    private updateContent() {
        this.pageService.getPageContent(this.page)
        .then((contents) => {
            this.pageContents = contents;
        });
    }

    private createPageContent(contentType, data) {
        const defaultTitle = contentType;
        if (this.page) {
            this.pageService.createPageContent(this.page, defaultTitle, contentType, data)
            .then(() => {
                this.updateContent();
            });
        } else {
            console.error('No page to add content to');
        }
    }

    public editContent(content: PageContent) {
        let dialogComponent: any = ButtonEditComponent;
        if (content.contentType === 'text') {
            dialogComponent = TextEditComponent;
        }

        this.dialog.open(dialogComponent, {
            data: content.data
        })
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                content.data = data;
                this.pageService.updatePageContent(this.page, content)
                .then(() => {
                    this.updateContent();
                });
            }
        });
    }

    public deleteContent(content: PageContent) {
        this.pageService.deletePageContent(this.page, content)
        .then(() => {
            this.updateContent();
        });
    }

    public addText() {
        this.dialog.open(TextEditComponent, {
            data: { text: 'Example text' }
        })
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                this.createPageContent('text', data);
            }
        });
    }

    public addButton() {
        this.dialog.open(ButtonEditComponent, {})
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                this.createPageContent('button', data);
            }
        });
    }

    public addQuestion() {
        console.error('Not implemented...');
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
