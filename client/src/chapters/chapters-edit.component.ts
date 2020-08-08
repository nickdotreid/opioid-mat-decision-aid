import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PageService, Page } from './page.service';
import { PageCreateComponent } from './page-create.component';
import { ReorderPagesComponent } from './reorder-pages.component';

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
        this.dialog.open(PageCreateComponent)
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                return this.chapterService.createChapter(data.title, data.published)
                .then(() => {
                    this.chapterService.update();
                })
                .catch((error) => {
                    console.log('Error creating chapter', error);
                });
            }
        });
    }

    public addPage(chapter: Chapter) {
        this.dialog.open(PageCreateComponent)
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                return this.pageService.create(chapter.id, data.title, data.published)
                .then(() => {
                    return this.chapterService.update();
                })
                .catch((error) => {
                    console.log('Add page error:', error);
                });
            }
        });
    }

    public editChapter(chapter: Chapter, error?: String) {
        this.dialog.open(PageCreateComponent, {
            data: {
                error: error,
                published: chapter.published,
                title: chapter.title
            }
        }).afterClosed().toPromise()
        .then((data) => {
            if (data) {
                chapter.title = data.title;
                chapter.published = data.published;
                return this.chapterService.updateChapter(chapter)
                .then(() => {
                    this.chapterService.update();
                })
                .catch((_error) => {
                    return this.editChapter(chapter, _error);
                });
            }
        });
    }

    public reorderPages(chapter: Chapter) {
        this.dialog.open(ReorderPagesComponent, {
            data: {
                pages: chapter.pages
            }
        });
    }

    public editPage(page: Page, error?: String) {
        this.dialog.open(PageCreateComponent, {
            data: {
                error: error,
                published: page.published,
                title: page.title
            }
        })
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                const updatedPage = { ...page };
                updatedPage.title = data.title;
                updatedPage.published = data.published;
                return this.pageService.update(updatedPage)
                .then(() => {
                    this.chapterService.update();
                })
                .catch((_error) => {
                    return this.editPage(page, _error);
                });
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

