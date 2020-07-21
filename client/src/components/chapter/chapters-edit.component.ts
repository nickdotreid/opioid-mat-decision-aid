import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ChapterCreateComponent } from './chapter-create.component';

@Component({
    templateUrl: './chapters-edit.component.html'
})
export class ChaptersEditComponent implements OnInit, OnDestroy {

    public chapters: Array<Chapter>;

    private chaptersSubscription: Subscription;

    constructor(
        private chapterService: ChapterService,
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

    public editChapter(chapter: Chapter) {
        this.dialog.open(ChapterCreateComponent, {
            data: {
                chapter: chapter
            }
        });
        console.log('Edit chapter', chapter.title);
    }

    public deleteChapter(chapter: Chapter) {
        console.log('Delete chapter', chapter.title);
    }
}

