import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ChapterCreateComponent } from './chapter-create.component';
import { PageService, Page } from './page.service';
import { PageCreateComponent } from './page-create.component';

@Component({
    templateUrl: './chapters-edit.component.html'
})
export class ChaptersEditComponent implements OnInit, OnDestroy {

    public chapters: Array<Chapter>;

    private chaptersSubscription: Subscription;

    constructor(
        private chapterService: ChapterService,
        private pageService: PageService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.chaptersSubscription = this.chapterService.chapters.subscribe((chapters) => {
            this.chapters = chapters;
        });
    }

    ngOnDestroy() {
        if (this.chaptersSubscription) {
            this.chaptersSubscription.unsubscribe();
        }
    }

    public createChapter() {
        this.dialog.open(ChapterCreateComponent);
    }

    public addPage(chapter: Chapter) {
        this.dialog.open(PageCreateComponent, {
            data: {
                chapter: chapter
            }
        });
    }

    public editChapter(chapter: Chapter) {
        this.dialog.open(ChapterCreateComponent, {
            data: {
                chapter: chapter
            }
        });
    }

    public editPage(page: Page) {
        this.dialog.open(PageCreateComponent, {
            data: {
                page: page
            }
        });
    }

    public deletePage(page: Page) {
        this.pageService.delete(page)
        .then(() => {
            this.chapterService.update();
        });
    }

    public deleteChapter(chapter: Chapter) {
        this.chapterService.deleteChapter(chapter)
        .then(() => {
            this.chapterService.update();
        });
    }
}

