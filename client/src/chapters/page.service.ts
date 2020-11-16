import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { title } from 'process';

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
    public published: boolean;
    public content: string;
    public chart: Chart;
    public quiz: Quiz;
}

export class PageContent {
    public id: string;
    public title: string;
    public published: boolean;
    public contentType: string;
    public data: any;
}

@Injectable()
export class PageService {

    constructor (
        private serverService: ServerService
    ) {}

    public create(chpater_id: string, _title: string, published?: boolean): Promise<Page> {
        return this.serverService.post(
            'pages/',
            {
                chapterId: chpater_id,
                title: _title,
                published: published
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
            title: page.title,
            published: page.published
        };
    }

    public deserializePage(data: any): Page {
        const page = new Page();
        page.id = data['id'];
        page.title = data['title'];
        page.published = data['published'];
        return page;
    }

    public getPageContent(page: Page): Promise<Array<PageContent>> {
        return this.serverService.get('pages/' + page.id + '/content/')
        .then((data) => {
            if (data) {
                const contents: Array<PageContent> = data.map((content_data) => {
                    const content = new PageContent();
                    content.id = content_data.id;
                    content.title = content_data.title;
                    content.contentType = content_data.content_type;
                    content.published = content_data.published;
                    content.data = content_data.data;
                    return content;
                });
                return contents;
            } else {
                return [];
            }
        })
        .catch(() => {
            return Promise.resolve([]);
        });
    }

    public createPageContent(page: Page, contentTitle: string, contentType: string, contentData: any): Promise<Page> {
        return this.serverService.post('pages/' + page.id + '/content/', {
            title: contentTitle,
            content_type: contentType,
            data: contentData
        })
        .then((response) => {
            return page;
        });
    }

    public getPageContentItem(pageId: string, contentId: string): Promise<PageContent> {
        const page_id = pageId;
        const content_id = contentId;
        return this.serverService.get(`pages/${page_id}/content/${content_id}`)
        .then((data) => {
            const content = new PageContent();
            content.id = data.id;
            content.title = data.title;
            content.contentType = data.content_type;
            content.published = data.published;
            content.data = data.data;
            return content;
        });
    }

    public updatePageContent(page: Page, content: PageContent): Promise<PageContent> {
        const page_id = page.id;
        const content_id = content.id;
        return this.serverService.post(`pages/${page_id}/content/${content_id}`, {
            published: content.published,
            title: content.title,
            content_type: content.contentType,
            data: content.data
        })
        .then(() => {
            return content;
        });
    }

    public deletePageContent(page: Page, content: PageContent): Promise<void> {
        const page_id = page.id;
        const content_id = content.id;
        return this.serverService.delete(`pages/${page_id}/content/${content_id}`)
        .then(() => {
            return undefined;
        });
    }

    public reorderPageContent(page: Page, contents: Array<PageContent>): Promise<Array<PageContent>> {
        return new Promise((resolve, reject) => {
            const pageId = page.id;
            const serializedPageContents = contents.map((content) => {
                return {
                    'id': content.id
                };
            });
            this.serverService.post(`pages/${pageId}/content/`, {
                'contents': serializedPageContents
            })
            .then((data) => {
                if (data && Array.isArray(data)) {
                    const updatedContents: Array<PageContent> = [];
                    data.forEach((content_data) => {
                        const content = new PageContent();
                        content.id = content_data.id;
                        content.title = content_data.title;
                        content.contentType = content_data.content_type;
                        content.published = content_data.published;
                        content.data = content_data.data;
                        updatedContents.push(content);
                    });
                    resolve(updatedContents);
                } else {
                    reject('Could not parse returned response');
                }
            });
        });

    }
}
