import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page, PageContent } from 'chapters/page.service';
import { Sortable } from '@shopify/draggable';

@Component({
    selector: 'app-page-gallery',
    templateUrl: './page-gallery.component.html'
})
export class PageGalleryComponent implements AfterViewInit {

    private contentObject: PageContent;

    @ViewChild('pageList') pagesElement: ElementRef;

    public pages: Array<Page>;
    @Input('isEditable') isEditable: boolean;

    @Output('navigateToPage') navigateToPage: EventEmitter<Page> = new EventEmitter();
    @Output('updatedContent') updatedContent: EventEmitter<PageContent> = new EventEmitter();

    constructor(
        private router: Router
    ) {}

    ngAfterViewInit() {
        if (this.isEditable) {
            const sortable = new Sortable(this.pagesElement.nativeElement, {
                draggable: 'li'
            });
            sortable.on('sortable:sorted', (event) => {
                const pages = this.pages.map(page => page);
                const movedPage = pages[event.oldIndex];
                pages.splice(event.oldIndex, 1);
                pages.splice(event.newIndes, 0, movedPage);
                this.pages = pages;

                const newContent = this.contentObject;
                newContent.data.pages = this.pages;
                this.updatedContent.emit(newContent);
            });
        }
    }

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
