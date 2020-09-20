import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Chapter, ChapterService } from './chapters.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChapterRouter } from './chapter-router.service';
import { Page, PageService, PageContent } from './page.service';


@Component({
    selector: 'app-page-content',
    templateUrl: './chapter-page.component.html',
    styleUrls: [
        './chapter-page.component.scss'
    ]
})
export class ChapterPageComponent {

    private title: string;
    public pageContents: Array<PageContent>;

    @Output('reachedEnd') reachedEnd: EventEmitter<boolean> = new EventEmitter();

    constructor (
        private pageService: PageService
    ) {}

    @Input() set page(page: Page) {
        if (page) {
            this.title = page.title;
            this.pageService.getPageContent(page)
            .then((contentList) => {
                this.pageContents = contentList;
                console.log(contentList);
            })
            .catch(() => {
                this.pageContents = undefined;
            });
        } else {
            this.title = undefined;
            this.pageContents = undefined;
        }
    }

}
