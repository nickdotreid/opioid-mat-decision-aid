import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

    @Input() editing: boolean;
    @Input() editable: boolean;

    constructor(
        private chapterService: ChapterService,
        private routerService: Router
    ) {}

    @Input() set page(page: Page) {
        this.currentPage = page;
        this.chapterService.getChapterForPage(page)
        .then((chapter) => {
            this.chapter = chapter;
            this.updatePages();
        });
    }

    public goToPage(page: Page) {
        this.routerService.navigate(['pages', page.id]);
    }

    public viewCurrentPage() {
        this.routerService.navigate(['pages', this.currentPage.id]);
    }

    public editCurrentPage() {
        this.routerService.navigate(['pages', this.currentPage.id, 'edit']);
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

