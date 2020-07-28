import { Injectable } from '@angular/core';
import { ChapterService } from './chapters.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Page } from './page.service';

@Injectable()
export class PageResolver implements Resolve<Page> {

    constructor(
        private chapterService: ChapterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Page> {
        const pageId = route.paramMap.get('pageId');
        return this.chapterService.getPage(pageId)
        .then((page) => {
            return page;
        });
    }
}

@Injectable()
export class DefaultPageResolver implements Resolve<Page> {

    constructor (
        private chapterService: ChapterService
    ) {}

    resolve(): Promise<Page> {
        return this.chapterService.getFirstChapter()
        .then((chapter) => {
            return Promise.resolve(chapter.pages[0]);
        });
    }
}
