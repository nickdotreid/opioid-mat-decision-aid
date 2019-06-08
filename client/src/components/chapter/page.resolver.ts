import { Injectable } from '@angular/core';
import { ChapterService, Page } from './chapters.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class PageResolver implements Resolve<Page> {

    constructor(
        private chapterService: ChapterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Page> {
        const chapterParam = route.paramMap.get('chapter');
        const pageParam = route.paramMap.get('page');
        return this.chapterService.getChapter(chapterParam)
        .then((chapter) => {
            const page = chapter.pages.find((_page) => {
                if (_page.slug === pageParam) {
                    return true;
                } else {
                    return false;
                }
            });
            if (page) {
                return Promise.resolve(page);
            } else {
                return Promise.resolve(chapter.pages[0]);
            }
        });
    }
}

@Injectable()
export class DefaultPageResolver implements Resolve<Page> {

    constructor (
        private chapterService: ChapterService
    ) {}

    resolve(): Promise<Page> {
        return this.chapterService.getAllChapters()
        .then((chapters) => {
            return Promise.resolve(chapters[0].pages[0]);
        });
    }
}
