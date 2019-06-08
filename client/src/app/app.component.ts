import { Component } from '@angular/core';
import { ChapterService } from '@components/chapter/chapters.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    constructor(
        private chapterService: ChapterService
    ) {
        this.chapterService.update();
    }
}
