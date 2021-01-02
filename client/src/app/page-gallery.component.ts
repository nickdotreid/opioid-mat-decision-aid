import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Page, PageContent, PageService } from 'chapters/page.service';

@Component({
    selector: 'app-page-gallery',
    templateUrl: './page-gallery.component.html'
})
export class PageGalleryComponent {

    private contentObject: PageContent;

    public pages: Array<Page>;
    @Input('isEditable') isEditable: boolean;

    constructor(
        private pageService: PageService,
        private router: Router
    ) {}

    @Input('content') set updateContent(content: PageContent) {
        if (content) {
            this.contentObject = content;
        }
        if (content && content.data && content.data.pages) {
            this.pages = content.data.pages;
        } else {
            this.pages = [];
        }
    }

    public addPage() {
        const parentId = this.contentObject.id;
        this.router.navigate([{
            outlets: {
                modal: `content-add/${parentId}/page`
            }
        }]);
    }
}
