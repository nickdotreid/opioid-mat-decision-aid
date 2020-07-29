import { Component } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { MatDialog } from '@angular/material';
import { PageCreateComponent } from './page-create.component';
import { Page } from './page.service';


@Component({
    templateUrl: './page-navigation.component.html',
    selector: 'app-page-navigation'
})
export class PageNavigationComponent {

    public chapter: Chapter;
    public pages: Array<Page>;
    public page: Page;

    constructor(
        private chapterService: ChapterService,
        private dialog: MatDialog
    ) {
        this.chapterService.currentChapter.subscribe((chapter) => {
            this.chapter = chapter;
            this.updatePages();
        });
        this.chapterService.currentPage.subscribe((page) => {
            this.page = page;
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

    public createPage() {
        this.dialog.open(PageCreateComponent, {
            data: {
                chapter: this.chapter
            }
        });
    }
}

