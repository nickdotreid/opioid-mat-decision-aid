import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as MediumEditor from 'medium-editor';

@Component({
    selector: 'app-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: RichTextEditorComponent,
        multi: true
      }]
})
export class RichTextEditorComponent implements AfterViewInit, ControlValueAccessor {

    @ViewChild('editor') editor: ElementRef;

    @Input('label') label: String;

    private onChange: Function;
    private onTouch: Function;

    public isDisabled: boolean;

    public value: string;
    public safeValue: SafeHtml;

    constructor(
        private domSanitizer: DomSanitizer
    ) {}

    ngAfterViewInit() {
        const mediumEditor = new MediumEditor(this.editor.nativeElement, {});
        mediumEditor.subscribe('editableInput', () => {
            const content = mediumEditor.getContent();
            this.onChange(content);
        });
    }

    public writeValue(value: string) {
        this.value = value;
        this.safeValue = this.domSanitizer.bypassSecurityTrustHtml(value);
    }

    public registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    public setDisabledState(disabled: boolean) {
        this.isDisabled = disabled;
    }

}
