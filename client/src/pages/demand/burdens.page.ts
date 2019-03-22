import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';


@Component({
    templateUrl: './burdens.page.html'
})
export class BurdensPageComponent implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'full');
    }

}
