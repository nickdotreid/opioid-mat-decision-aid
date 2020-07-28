import { Injectable } from '@angular/core';
import { ChapterService } from './chapters.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Page } from './page.service';



@Injectable()
export class ChapterResolver implements Resolve<Page> {

    constructor(
        private chapterService: ChapterService,
        private router: Router
    ) {}

    public resolve(activatedRoute: ActivatedRouteSnapshot): Promise<Page> {
        return this.chapterService.getChapter(activatedRoute.paramMap.get('chapterId'))
        .then((chapter) => {
            return Promise.resolve(chapter.pages[0]);
        })
        .catch(() => {
            this.navigateToDefaultChapter();
            return new Page();
        });
    }

    private navigateToDefaultChapter() {
        this.chapterService.getFirstChapter()
        .then((chapter) => {
            this.router.navigate([chapter.id]);
        });
    }
}
