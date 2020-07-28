import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ChapterCreateComponent } from './chapter-create.component';
import { ChapterRouter } from './chapter-router.service';


@Component({
    selector: 'app-chapter-navigation',
    templateUrl: './chapter-navigation.component.html'
})
export class ChapterNavigationComponent implements OnInit, OnDestroy {

    public chapters: Array<Chapter>;

    private chapterSubscription: Subscription;

    constructor (
        private chapterService: ChapterService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.chapterSubscription = this.chapterService.chapters.subscribe((chapters) => {
            this.chapters = chapters;
        });
    }

    ngOnDestroy() {
        if (this.chapterSubscription) {
            this.chapterSubscription.unsubscribe();
        }
    }

    public addChapter() {
        this.dialog.open(ChapterCreateComponent);
    }

    public routerLink(chapter: Chapter) {
        return ['/chapters', chapter.id];
    }

}