import { Injectable } from '@angular/core';
import { Chapter, ChapterService } from './chapters.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';



@Injectable()
export class ChapterResolver implements Resolve<Chapter> {

    constructor(
        private chapterService: ChapterService,
        private router: Router
    ) {}

    public resolve(activatedRoute: ActivatedRouteSnapshot): Promise<Chapter> {
        return this.chapterService.getChapter(activatedRoute.paramMap.get('chapter'))
        .then((chapter) => {
            return Promise.resolve(chapter);
        })
        .catch(() => {
            this.navigateToDefaultChapter();
            return new Chapter();
        });
    }

    private navigateToDefaultChapter() {
        this.chapterService.getFirstChapter()
        .then((chapter) => {
            this.router.navigate([chapter.slug]);
        });
    }
}

@Injectable()
export class DefaultChapterResolver implements Resolve<Chapter> {

    constructor (
        private chapterService: ChapterService
    ) {}

    resolve(): Promise<Chapter> {
        return this.chapterService.getAllChapters()
        .then((chapters) => {
            return Promise.resolve(chapters[0]);
        });
    }
}
