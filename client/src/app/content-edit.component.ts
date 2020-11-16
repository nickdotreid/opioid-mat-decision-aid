import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageContent, PageService } from 'chapters/page.service';
import { PageContentService } from 'page-contents/page-content.service';


@Component({
    'templateUrl': './content-edit.component.html'
})
export class ContentEditComponent {

    public content: PageContent;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageService: PageService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params['contentId'] && params['pageId']) {
                this.pageService.getPageContentItem(params['pageId'], params['contentId'])
                .then((pageContent) => {
                    this.content = pageContent;
                })
                .catch(() => {
                    this.close();
                });
            } else {
                this.close();
            }
        });
    }

    public close() {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
