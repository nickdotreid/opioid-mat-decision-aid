import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

export class Chart {
    title: string;
    effects: Array<string>;
    medications: Array<string>;
}

export class Question {
    public text: string;
    public options: Array<any>;
}

export class Quiz {
    public slug: string;
    public title: string;

    public questions: Array<Question>;
}

export class Page {
    public slug: string;
    public title: string;
    public content: string;
    public chart: Chart;
    public quiz: Quiz;
}

export class Chapter {
    public slug: string;
    public title: string;
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

    constructor(
        private httpClient: HttpClient
    ) {}

    public update(): Promise<boolean> {
        return this.httpClient.get('api/chapters/')
        .toPromise()
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

    public getChapter(slug: string): Promise<Chapter> {
        return this.getAllChapters()
        .then((chapters) => {
            const chapter = chapters.find((_chapter: Chapter) => {
                if (_chapter.slug === slug) {
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
                if (chapter.slug === _chapter.slug) {
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

    private deserializeChapter(data: any): Chapter {
        const chapter = new Chapter(this);
        chapter.slug = data.slug;
        chapter.title = data.title;
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
        page.slug = data.slug;
        page.title = data.title;
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
            page.quiz.slug = data.quiz.slug;
            page.quiz.questions = data.quiz.questions;

        }
        return page;
    }

}
