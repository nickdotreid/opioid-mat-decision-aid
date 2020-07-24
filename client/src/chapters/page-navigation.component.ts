import { Component } from '@angular/core';
import { ChapterService, Chapter, Page } from './chapters.service';
import { MatDialog } from '@angular/material';
import { PageCreateComponent } from './page-create.component';


@Component({
    templateUrl: './page-navigation.component.html',
    selector: 'app-page-navigation'
})
export class PageNavigationComponent {

    public chapter: Chapter;
    public page: Page;

    constructor(
        private chapterService: ChapterService,
        private dialog: MatDialog
    ) {
        this.chapterService.currentChapter.subscribe((chapter) => {
            this.chapter = chapter;
        });
    }

    public createPage() {
        this.dialog.open(PageCreateComponent, {
            data: {
                chapter: this.chapter
            }
        });
    }
}

