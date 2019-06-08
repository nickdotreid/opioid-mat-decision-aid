import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

export class Page {
    public slug: string;
    public title: string;
    public content: string;
}

export class Chapter {
    public slug: string;
    public title: string;
    public pages: Array<Page>;
}

@Injectable()
export class ChapterService {

    public chapters: ReplaySubject<Array<Chapter>> = new ReplaySubject(1);

    constructor(
        private httpClient: HttpClient
    ) {}

    public update(): Promise<boolean> {
        return this.httpClient.get('api/chapters/')
        .toPromise()
        .then((chapterList: Array<any>) => {
            const chapters = [];
            chapterList.forEach(element => {
                const chapter = new Chapter();
                chapter.slug = element.slug;
                chapter.title = element.title;
                chapters.push(chapter);
            });
            this.chapters.next(chapters);
        })
        .then(() => {
            return Promise.resolve(true);
        });
    }

}
