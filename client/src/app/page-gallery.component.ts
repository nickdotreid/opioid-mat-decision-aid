import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page, PageContent } from 'chapters/page.service';

@Component({
    selector: 'app-page-gallery',
    templateUrl: './page-gallery.component.html'
})
export class PageGalleryComponent {

    private contentObject: PageContent;

    public pages: Array<Page>;
    @Input('isEditable') isEditable: boolean;

    @Output('navigateToPage') navigateToPage: EventEmitter<Page> = new EventEmitter();

    constructor(
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

    public editPage(page) {
        const parentId = this.contentObject.id;
        this.router.navigate([{
            outlets: {
                modal: `content-edit/${parentId}/${page.id}`
            }
        }]);
    }

    public goToPage(page) {
        this.navigateToPage.emit(page);
    }
}
