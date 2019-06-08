import { Component } from '@angular/core';
import { Chapter, Page } from './chapters.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: './chapter-page.component.html'
})
export class ChapterPageComponent {

    public chapter: Chapter;
    public page: Page;

    constructor (
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.data
        .subscribe((data) => {
            this.chapter = data.chapter;
            this.page = data.page;
        });
    }

    public goToNextPage() {
        const index = this.chapter.pages.findIndex((_page) => {
            if (this.page.slug === _page.slug) {
                return true;
            }
        });
        const nextIndex = index + 1;
        if (nextIndex < this.chapter.pages.length) {
            const nextPage = this.chapter.pages[nextIndex];
            this.router.navigate([this.chapter.slug, nextPage.slug]);
        } else {
            this.chapter.getNextChapter()
            .then((nextChapter) => {
                this.router.navigate([nextChapter.slug]);
            })
            .catch(() => {
                console.log('No next chapter or page');
            });
        }
    }

}
