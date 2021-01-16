import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page, PageService, PageContent } from 'chapters/page.service';
import { MatDialog } from '@angular/material';
import { Chapter, ChapterService } from 'chapters/chapters.service';
import { LoginService } from 'login/login.service';
import { ReorderPagesComponent } from 'chapters/reorder-pages.component';

@Component({
    templateUrl: './page.component.html'
})
export class PageComponent implements OnDestroy {

    public chapters: Array<Chapter> = [];
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
        console.log('Page component start');
        this.routeSubscription = this.route.data.subscribe((data) => {
            console.log('Page component, router change', data);
            if (data.page) {
                this.page = data.page;
                this.updateContent();
                this.chapterService.currentPage.next(this.page);
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

    public editPage() {
        this.router.navigate([{outlets: { modal: ['edit', 'page', this.page.id]}}]);
    }

    public editCurrentPage() {
        this.router.navigate(['pages', this.page.id, 'edit']);
    }

    public viewCurrentPage() {
        this.router.navigate(['pages', this.page.id]);
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

    public editContent(content: PageContent) {
        const contentId = content.id;
        const pageId = this.page.id;
        this.router.navigate([{ outlets: { modal: `content-edit/${pageId}/${contentId}`}}]);
    }

    public deleteContent(content: PageContent) {
        this.pageService.deletePageContent(this.page, content)
        .then(() => {
            this.updateContent();
        });
    }

    private addContent(contentType: string) {
        const pageId = this.page.id;
        this.router.navigate([{ outlets: { modal: `content-add/${pageId}/${contentType}`}}]);
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

    public addPageGallery() {
        const pageGallery = new PageContent();
        pageGallery.contentType = 'page-gallery';
        pageGallery.title = 'Page Gallery';
        pageGallery.data = {};
        this.pageService.createPageContent(this.page, pageGallery)
        .then(() => {
            this.updateContent();
        });
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
