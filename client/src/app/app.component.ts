import { Component } from '@angular/core';
import { ChapterService, Page, Chapter } from '@components/chapter/chapters.service';
import { MedicationEffectsService } from '@domain/medication-effects/medication-effects.service';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { ParticipantService, Participant } from '@domain/participant/participant.service';
import { TouchSequence } from 'selenium-webdriver';

declare var gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    public navigationCollapsed = true;
    public outputCollapsed = true;

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

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.focusMain();
            }
        });

        this.chapterService.completedContent.subscribe(() => {
            this.outputCollapsed = false;
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

    public login() {
        this.router.navigate(['login']);
    }

    public navigationToggle() {
        this.navigationCollapsed = !this.navigationCollapsed;
    }

    public outputToggle() {
        this.outputCollapsed = !this.outputCollapsed;
    }

    public createParticipant() {
        this.participantService.create();
    }

    public clearParticipant() {
        this.participantService.clear();
    }

    public focusMain() {
        this.navigationCollapsed = true;
        this.outputCollapsed = true;
    }
}
