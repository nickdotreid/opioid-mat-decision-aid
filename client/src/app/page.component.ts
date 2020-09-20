import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page, PageService } from 'chapters/page.service';

@Component({
    templateUrl: './page.component.html'
})
export class PageComponent implements OnDestroy {

    public page: Page;
    public isEditable: boolean;

    private routeSubscription: Subscription;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute
    ) {
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data.page) {
                this.page = data.page;
            } else {
                this.page = undefined;
            }
            if (data.isEditable) {
                this.isEditable = true;
            } else {
                this.isEditable = false;
            }
        });
    }

    public addContent() {
        if (this.page) {
            this.pageService.createPageContent(this.page);
        } else {
            console.error('No page to add content to');
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
