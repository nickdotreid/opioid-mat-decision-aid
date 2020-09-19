import { Component, Input } from '@angular/core';
import { ChapterService, Chapter } from '../chapters/chapters.service';
import { Page } from '../chapters/page.service';


@Component({
    templateUrl: './page-navigation.component.html',
    selector: 'app-page-navigation'
})
export class PageNavigationComponent {

    public chapter: Chapter;
    public pages: Array<Page>;
    public currentPage: Page;

    constructor(
        private chapterService: ChapterService
    ) {}

    @Input() set page(page: Page) {
        this.currentPage = page;
        this.chapterService.getChapterForPage(page)
        .then((chapter) => {
            this.chapter = chapter;
            this.updatePages();
        });
    }

    private updatePages() {
        if (this.chapter) {
            this.pages = this.chapter.pages
            .filter(_page => _page.published)
            .map((_page) => {
                const page = new Page();
                page.id = _page.id;
                page.title = _page.title;
                return page;
            });
        } else {
            this.pages = undefined;
        }
    }
}

