import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page } from 'chapters/page.service';

@Component({
    templateUrl: './page.component.html'
})
export class PageComponent implements OnDestroy {

    public page: Page;
    public isEditable: boolean;

    private routeSubscription: Subscription;

    constructor(
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

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
