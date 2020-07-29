import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService, Chapter } from './chapters.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-chapter-navigation',
    templateUrl: './chapter-navigation.component.html'
})
export class ChapterNavigationComponent implements OnInit, OnDestroy {

    public chapters: Array<Chapter>;

    private chapterSubscription: Subscription;

    constructor (
        private chapterService: ChapterService
    ) {}

    ngOnInit() {
        this.chapterSubscription = this.chapterService.chapters.subscribe((chapters) => {
            this.chapters = chapters.filter(chapter => chapter.published);
        });
    }

    ngOnDestroy() {
        if (this.chapterSubscription) {
            this.chapterSubscription.unsubscribe();
        }
    }

    public routerLink(chapter: Chapter) {
        return ['/chapters', chapter.id];
    }

}
