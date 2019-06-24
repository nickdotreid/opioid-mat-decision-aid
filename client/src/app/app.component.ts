import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { ChapterService, Page, Chapter } from '@components/chapter/chapters.service';
import { MedicationEffectsService } from '@domain/medication-effects/medication-effects.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { ParticipantService, Participant } from '@domain/participant/participant.service';

declare var gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('navigation') navigation: MatSidenav;
    @ViewChild('output') output: MatSidenav;
    title = 'client';

    public navigationCollapsed = true;

    public currentPage: Page;
    public currentChapter: Chapter;

    public participant: Participant;

    constructor(
        private chapterService: ChapterService,
        private medicationEffectsService: MedicationEffectsService,
        private router: Router,
        private participantService: ParticipantService
    ) {
        this.chapterService.update();
        this.medicationEffectsService.update();

        this.chapterService.completedContent.subscribe(() => {
            this.output.open();
        });

        this.chapterService.currentChapter
        .subscribe((chapter) => {
            this.currentChapter = chapter;
        });

        this.chapterService.currentPage.subscribe((page) => {
            this.currentPage = page;
        });

        this.participantService.participant.subscribe((participant) => {
            this.participant = participant;
        });

        router.events.subscribe(event => {
            if (event instanceof NavigationEnd && this.participant) {
                gtag('config', 'UA-142595118-1', {
                    'page_path': event.url,
                    'user_id': this.participant.id
                });
            }
        });

    }

    public createParticipant() {
        this.participantService.create();
    }

    public clearParticipant() {
        this.participantService.clear();
        this.output.close();
    }
}
