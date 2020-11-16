import { NgModule } from '@angular/core';
import { ServerModule } from 'server/server.module';
import { PageContentService } from './page-content.service';

@NgModule({
    imports: [
        ServerModule
    ],
    providers: [
        PageContentService
    ]
})
export class PageContentModule {}
