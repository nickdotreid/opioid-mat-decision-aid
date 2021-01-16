import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Page, PageService } from 'chapters/page.service';

@Injectable()
export class PageResolver implements Resolve<Page> {
    constructor(
        private pageService: PageService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Page> {
        const pageId = route.paramMap.get('pageId');
        return this.pageService.get(pageId);
    }
}

