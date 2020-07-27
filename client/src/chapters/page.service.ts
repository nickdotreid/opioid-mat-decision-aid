import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';

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
    public id: string;
    public title: string;
    public description: string;
    public points_to_pass: number;
    public questions: Array<Question>;
}


export class Page {
    public id: string;
    public title: string;
    public content: string;
    public chart: Chart;
    public quiz: Quiz;
}

@Injectable()
export class PageService {

    constructor (
        private serverService: ServerService
    ) {}

    public create(chpater_id: string, title: string): Promise<Page> {
        return this.serverService.post(
            'pages/',
            {
                chapterId: chpater_id,
                title: title
            }
        );
    }

    public get(page_id): Promise<Page> {
        return this.serverService.get(
            'pages/' + page_id + '/'
        )
        .then((data) => {
            return this.deserializePage(data);
        });
    }

    public update(page): Promise<Page> {
        return this.serverService.post(
            'pages/' + page.id + '/',
            this.serializePage(page)
        );
    }

    public delete(page): Promise<void> {
        return this.serverService.delete(
            'pages/' + page.id + '/'
        )
        .then(() => {
            return undefined;
        });
    }

    public serializePage(page: Page): any {
        return {
            id: page.id,
            title: page.title
        };
    }

    public deserializePage(data: any): Page {
        const page = new Page();
        page.id = data['id'];
        page.title = data['title'];
        return page;
    }
}
