import { Injectable } from '@angular/core';
import { ChapterService } from 'chapters/chapters.service';
import { Page, PageContent, PageService } from 'chapters/page.service';
import { ServerService } from 'server/server.service';


@Injectable()
export class ContentService {

    constructor(
        private pageService: PageService,
        private chapterService: ChapterService
    ) {}

    public get(contentId: string): Promise<PageContent> {
        return this.chapterService.getChapter(contentId)
        .then((chapter) => {
            const content = new PageContent();
            content.id = chapter.id;
            content.contentType = 'chapter';
            content.published = chapter.published;
            return content;
        })
        .catch(() => {
            return this.pageService.get(contentId);
        })
        .then((page: Page) => {
            const content = new PageContent();
            content.id = page.id;
            content.published = page.published;
            content.contentType = 'page';
            return content;
        })
        .catch(() => {
            const currentPage = this.chapterService.currentPage.getValue();
            if (currentPage) {
                return this.pageService.getPageContentItem(currentPage.id, contentId);
            } else {
                return Promise.reject('No current page?');
            }
        })
        .catch(() => {
            return Promise.reject('No content');
        });
    }
}
