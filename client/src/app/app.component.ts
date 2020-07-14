import { Component } from '@angular/core';
import { ChapterService, Page, Chapter } from '@components/chapter/chapters.service';
import { Router, NavigationStart, Event } from '@angular/router';
import { ParticipantService, Participant } from '@domain/participant/participant.service';
import { LoginService } from '@components/login/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    public isEditor: Boolean = false;

    public navigationCollapsed = true;
    public outputCollapsed = true;

    public currentPage: Page;
    public currentChapter: Chapter;

    public participant: Participant;

    constructor(
        private chapterService: ChapterService,
        private router: Router,
        private participantService: ParticipantService,
        private loginService: LoginService
    ) {
        this.chapterService.update();

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.focusMain();
            }
        });

        this.loginService.editor.subscribe((editor) => {
            if (editor) {
                this.isEditor = true;
            } else {
                this.isEditor = false;
            }
        })

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

    }

    public login() {
        this.router.navigate(['login']);
    }

    public editDecisionAid() {
        this.router.navigate(['chapters', 'edit']);
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
