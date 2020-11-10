import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page, PageService, PageContent } from 'chapters/page.service';
import { MatDialog } from '@angular/material';
import { ButtonEditComponent } from './button-edit.component';
import { TextEditComponent } from './text-edit.component';
import { QuestionEditComponent } from './question-edit.component';
import { Chapter, ChapterService } from 'chapters/chapters.service';
import { LoginService } from 'login/login.service';
import { ReorderPagesComponent } from 'chapters/reorder-pages.component';
import { AccordionEditComponent } from './accordion-edit.component';

@Component({
    templateUrl: './page.component.html'
})
export class PageComponent implements OnDestroy {

    public chapters: Array<Chapter>;
    public chapter: Chapter;
    public page: Page;
    public pageContents: Array<PageContent> = [];
    public isEditable: boolean;
    public isEditor: boolean;

    private routeSubscription: Subscription;
    private chapterSubscription: Subscription;
    private editorSubscription: Subscription;

    constructor(
        private chapterService: ChapterService,
        private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private loginService: LoginService
    ) {
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data.page) {
                this.page = data.page;
                this.updateContent();
            } else {
                this.page = undefined;
                this.pageContents = [];
            }
            if (data.isEditable) {
                this.isEditable = true;
            } else {
                this.isEditable = false;
            }
        });
        this.editorSubscription = this.loginService.editor.subscribe((editor) => {
            if (editor) {
                this.isEditor = true;
            } else {
                this.isEditor = false;
            }
        });
        this.chapterSubscription = this.chapterService.chapters.subscribe((chapters) => {
            this.chapters = chapters.filter((chapter) => {
                return chapter.published;
            });
        });
    }

    public editCurrentPage() {
        this.router.navigate(['pages', this.page.id, 'edit']);
    }

    public viewCurrentPage() {
        this.router.navigate(['pages', this.page.id]);
    }

    public publishPage() {
        this.page.published = true;
        this.pageService.update(this.page);
    }

    public unpublishPage() {
        this.page.published = false;
        this.pageService.update(this.page);
    }

    private updateContent() {
        this.chapterService.getChapterForPage(this.page)
        .then((chapter) => {
            this.chapter = chapter;
        });
        this.pageService.getPageContent(this.page)
        .then((contents) => {
            this.pageContents = contents;
        });
    }

    private createPageContent(contentType, data) {
        const defaultTitle = contentType;
        if (this.page) {
            this.pageService.createPageContent(this.page, defaultTitle, contentType, data)
            .then(() => {
                this.updateContent();
            });
        } else {
            console.error('No page to add content to');
        }
    }

    private getContentEditComponent(contentType: string) {
        const contentTypeEditorMap = {
            'accordion': AccordionEditComponent,
            'button': ButtonEditComponent,
            'gallery': AccordionEditComponent,
            'question': QuestionEditComponent,
            'text': TextEditComponent
        };
        if (contentTypeEditorMap[contentType]) {
            return contentTypeEditorMap[contentType];
        } else {
            return ButtonEditComponent;
        }
    }

    public editContent(content: PageContent) {
        const dialogComponent = this.getContentEditComponent(content.contentType);
        this.dialog.open(dialogComponent, {
            data: content.data
        })
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                content.data = data;
                this.pageService.updatePageContent(this.page, content)
                .then(() => {
                    this.updateContent();
                });
            }
        });
    }

    public deleteContent(content: PageContent) {
        this.pageService.deletePageContent(this.page, content)
        .then(() => {
            this.updateContent();
        });
    }

    private addContent(contentType: string) {
        const dialogComponent = this.getContentEditComponent(contentType);
        this.dialog.open(dialogComponent)
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                this.createPageContent(contentType, data);
            }
        });
    }

    public addText() {
        this.addContent('text');
    }

    public addButton() {
        this.addContent('button');
    }

    public addQuestion() {
        this.addContent('question');
    }

    public addAccordion() {
        this.addContent('accordion');
    }

    public addGallery() {
        this.addContent('gallery');
    }

    public buttonAction(content: PageContent) {
        this.chapterService.getNextPage(this.page)
        .then((page: Page) => {
            if (this.isEditable) {
                this.router.navigate(['pages', page.id, 'edit']);
            } else {
                this.router.navigate(['pages', page.id]);
            }
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.editorSubscription.unsubscribe();
        this.chapterSubscription.unsubscribe();
    }

    public reorderPageContent() {
        this.dialog.open(ReorderPagesComponent, {
            data: {
                pages: this.pageContents
            }
        })
        .afterClosed().toPromise()
        .then((data) => {
            if (data) {
                this.pageService.reorderPageContent(this.page, data)
                .then((updatedPageContents) => {
                    this.pageContents = updatedPageContents;
                });
            }
        });
    }
}
