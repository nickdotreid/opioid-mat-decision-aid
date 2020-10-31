import { Injectable, EventEmitter } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

import { ServerService } from '../server/server.service';

import { Page, Quiz, Chart } from './page.service';

export class Chapter {
    public id: string;
    public title: string;
    public published: boolean;
    public pages: Array<Page>;

    constructor(
        private chapterService?: ChapterService
    ) {}

    public getNextChapter(): Promise<Chapter> {
        if (this.chapterService) {
            return this.chapterService.getChapterAfter(this);
        } else {
            return Promise.reject('No chapter service');
        }
    }
}

@Injectable()
export class ChapterService {

    public chapters: ReplaySubject<Array<Chapter>> = new ReplaySubject(1);
    private _chapters: Array<Chapter>;

    public currentChapter: BehaviorSubject<Chapter> = new BehaviorSubject(null);
    public currentPage: BehaviorSubject<Page> = new BehaviorSubject(null);

    public completedContent: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private serverService: ServerService
    ) {}

    public update(): Promise<boolean> {
        return this.serverService.get('chapters/')
        .then((chapterList: Array<any>) => {
            const chapters = [];
            chapterList.forEach(element => {
                chapters.push(this.deserializeChapter(element));
            });
            this._chapters = chapters;
            this.chapters.next(chapters);
        })
        .then(() => {
            return Promise.resolve(true);
        });
    }

    public getChapter(id: string): Promise<Chapter> {
        return this.getAllChapters()
        .then((chapters) => {
            const chapter = chapters.find((_chapter: Chapter) => {
                if (_chapter.id.toString() === id) {
                    return true;
                } else {
                    return false;
                }
            });
            if (chapter) {
                return Promise.resolve(chapter);
            } else {
                return Promise.reject('Chapter not found');
            }
        });
    }

    public getChapterForPage(page: Page): Promise<Chapter> {
        return this.getAllChapters()
        .then((chapters) => {
            const chapter = chapters.find((_chapter) => {
                const pageIds = _chapter.pages.map(_page => _page.id);
                return pageIds.indexOf(page.id) >= 0;
            });
            return chapter;
        });
    }

    public getPage(id: string): Promise<Page> {
        return this.getAllChapters()
        .then((chapters) => {
            let pages = [];
            chapters.forEach((_chapter) => {
                pages = pages.concat(_chapter.pages);
            });
            const page = pages.find((_page) => {
                return _page.id === id;
            });
            return page;
        });
    }

    public createChapter(title: string, published: boolean): Promise<Chapter> {
        return this.serverService.post('chapters/', {
            title: title,
            published: published
        })
        .then((data: any) => {
            const chapter = new Chapter(this);
            chapter.title = data.title;
            return this.update().then(() => {
                return chapter;
            });
        })
        .catch((error) => {
            console.error('Error is', error);
            return Promise.reject(error);
        });
    }

    public updateChapter(chapter: Chapter): Promise<Chapter> {
        return this.serverService.post('chapters/' + chapter.id + '/', {
            title: chapter.title,
            published: chapter.published
        });
    }

    public deleteChapter(chapter: Chapter): Promise<void> {
        return this.serverService.delete('chapters/' + chapter.id + '/')
        .then(() => {
            return undefined;
        });
    }

    public updateChapterOrder(chapters: Array<Chapter>): Promise<Array<Chapter>> {
        const serialized_chapters = chapters.map((_chapter) => {
            return {
                'id': _chapter.id,
                'title': _chapter.title,
                'published': _chapter.published
            };
        });
        return this.serverService.post(
            'chapters/',
            serialized_chapters
        ).then(() => {
            return chapters;
        });
    }

    public updateChapterPageOrder(chapter: Chapter, pages: Array<Page>): Promise<Chapter> {
        const serialized_pages = pages.map((_page) => {
            return {
                'id': _page.id,
                'title': _page.title,
                'published': _page.published
            };
        });
        return this.serverService.post(
            'chapters/' + chapter.id + '/pages/',
            serialized_pages
        ).then(() => {
            chapter.pages = pages;
            return chapter;
        });
    }

    public createPage(chapter: Chapter, title: string, published: boolean): Promise<Page> {
        return this.serverService.post('pages/', {
            chapterId: chapter.id,
            title: title
        })
        .then((data: any) => {
            const page = new Page();
            page.title = data.title;
            return this.update().then(() => {
                return page;
            });
        });
    }

    public getFirstChapter(): Promise<Chapter> {
        return this.getAllChapters()
        .then((chapters) => {
            return chapters[0];
        });
    }

    public getChapterAfter(chapter: Chapter): Promise<Chapter> {
        return this.getAllChapters()
        .then((chapters) => {
            const currentIndex = chapters.findIndex((_chapter) => {
                if (chapter.id === _chapter.id) {
                    return true;
                }
            });
            const nextIndex = currentIndex + 1;
            if (nextIndex < chapters.length) {
                return Promise.resolve(chapters[nextIndex]);
            } else {
                return Promise.reject('No next chapter');
            }
        });
    }

    public getAllChapters(): Promise<Array<Chapter>> {
        if (this._chapters) {
            return Promise.resolve(this._chapters);
        } else {
            return this.update()
            .then(() => {
                return this.getAllChapters();
            });
        }
    }

    public getNextPage(page: Page): Promise<Page> {
        return this.getChapterForPage(page)
        .then((chapter) => {
            const pageIndex = chapter.pages.findIndex((_page) => {
                return _page.id === page.id;
            });
            if (pageIndex === -1) {
                return Promise.reject('Page not found in chapter');
            }
            if (pageIndex + 1 < chapter.pages.length) {
                return chapter.pages[pageIndex + 1];
            } else {
                return this.getChapterAfter(chapter)
                .then((nextChapter) => {
                    return nextChapter.pages.find((_page) => {
                        return _page.published;
                    });
                })
                .catch(() => {
                    return Promise.reject('No next page');
                });
            }
        });
    }

    public setCurrentPage(page: Page) {
        this.currentPage.next(page);
    }

    public setCurrentChapter(chapter: Chapter) {
        this.currentChapter.next(chapter);
    }

    private deserializeChapter(data: any): Chapter {
        const chapter = new Chapter(this);
        chapter.id = data.id;
        chapter.title = data.title;
        chapter.published = data.published;
        chapter.pages = [];
        if (data.pages && data.pages.length) {
            data.pages.forEach((element) => {
                chapter.pages.push(this.deserializePage(element));
            });
        }
        return chapter;
    }

    private deserializePage(data: any): Page {
        const page = new Page();
        page.id = String(data.id);
        page.title = data.title;
        page.published = data.published;
        page.content = data.content;
        if (data.chart) {
            page.chart = new Chart();
            page.chart.title = data.chart.title;
            page.chart.effects = data.chart.effects;
            page.chart.medications = data.chart.medications;
        }
        if (data.quiz) {
            page.quiz = new Quiz();
            page.quiz.title = data.quiz.title;
            page.quiz.id = data.quiz.id;
            page.quiz.description = data.quiz.description;
            page.quiz.points_to_pass = data.quiz.points_to_pass;
            page.quiz.questions = data.quiz.questions;
        }
        return page;
    }

}
