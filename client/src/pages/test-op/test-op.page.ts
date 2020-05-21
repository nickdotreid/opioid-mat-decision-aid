import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
    templateUrl: './test-op.page.html'
})
export class BenefitsPageComponent implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'full');
    }

}
