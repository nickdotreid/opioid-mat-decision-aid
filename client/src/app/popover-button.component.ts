import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import tippy from 'tippy.js';


@Component({
    template: '<ng-content></ng-content>',
    selector: 'app-popover-button'
})
export class PopoverButtonComponent implements OnInit, OnDestroy {

    @Input('content') content: string;
    private tippyInstance: any;

    constructor (
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.tippyInstance = tippy(this.el.nativeElement, {
            allowHTML: true,
            content: this.content,
            trigger: 'click focus mouseenter'
        });
    }

    ngOnDestroy() {
        if (this.tippyInstance) {
            this.tippyInstance.destroy();
        }
    }
}
