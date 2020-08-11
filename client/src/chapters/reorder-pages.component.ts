import { Component, Inject, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Sortable } from '@shopify/draggable';
import { Observable } from 'rxjs';
import { Page } from './page.service';


@Component({
    templateUrl: './reorder-pages.component.html'
})
export class ReorderPagesComponent implements AfterViewInit {
    @ViewChild('list') list: ElementRef;

    public pages: Array<Page>;

    constructor(
        private dialog: MatDialogRef<ReorderPagesComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        if (data.pages) {
            this.pages = data.pages.map((_page) => {
                const page = new Page();
                page.id = _page.id;
                page.title = _page.title;
                page.published = _page.published;
                return page;
            });
        } else {
            this.pages = [];
        }
    }

    ngAfterViewInit() {
        // tslint:disable-next-line:no-unused-expression
        new Sortable(this.list.nativeElement, {
            draggable: 'li'
        });
    }

    public save() {
        const reorderedPages: Array<Page> = [];
        Array.from(this.list.nativeElement.children).forEach((childNode: any) => {
            const page = this.pages.find((_page) => {
                return _page.id.toString() === childNode.id;
            });
            reorderedPages.push(page);
        });
        this.dialog.close(reorderedPages);
    }
}

