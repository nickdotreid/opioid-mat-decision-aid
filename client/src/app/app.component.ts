import { Component } from '@angular/core';
import { ChapterService } from '@components/chapter/chapters.service';
import { MedicationEffectsService } from '@domain/medication-effects/medication-effects.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    constructor(
        private chapterService: ChapterService,
        private medicationEffectsService: MedicationEffectsService
    ) {
        this.chapterService.update();
        this.medicationEffectsService.update();
    }
}
