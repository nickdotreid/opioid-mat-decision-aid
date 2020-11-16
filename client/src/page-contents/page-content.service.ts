import { Injectable } from '@angular/core';
import { ServerService } from 'server/server.service';

export class PageContent {
    public id: string;
    public title: string;
    public published: boolean;
    public contentType: string;
    public data: any;
}


@Injectable()
export class PageContentService {

    constructor(
        private serverService: ServerService
    ) {}

    public get(contentId: string) {
        console.log('Got content it', contentId);
    }

    public serialize(content: PageContent): any {
        return {
            published: content.published,
            title: content.title,
            content_type: content.contentType,
            data: content.data
        };
    }

    public deserialize(data: any): PageContent {
        const content = new PageContent();
        content.id = data.id;
        content.title = data.title;
        content.contentType = data.content_type;
        content.published = data.published;
        content.data = data.data;
        return content;
    }

}
