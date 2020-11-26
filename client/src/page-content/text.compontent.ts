import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-text',
    template: '<div [innerHTML]="safeHtml" ></div>'
})
export class TextComponent {

    public safeHtml;

    constructor(
        private domSanatizer: DomSanitizer
    ) {}

    @Input('html') set setHtml(value) {
        this.safeHtml = this.domSanatizer.bypassSecurityTrustHtml(value);
    }
}
