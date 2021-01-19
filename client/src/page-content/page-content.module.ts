import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from 'form/form.module';
import { AccordionEditComponent } from './accordion-edit.component';
import { ButtonEditComponent } from './button-edit.component';
import { PopoverGalleryComponent } from './popover-gallery.component';
import { QuestionEditComponent } from './question-edit.component';
import { TextEditComponent } from './text-edit.component';
import { TextComponent } from './text.compontent';


@NgModule({
    declarations: [
        AccordionEditComponent,
        ButtonEditComponent,
        TextComponent,
        TextEditComponent,
        QuestionEditComponent,
        PopoverGalleryComponent
    ],
    exports: [
        AccordionEditComponent,
        ButtonEditComponent,
        TextComponent,
        TextEditComponent,
        QuestionEditComponent,
        PopoverGalleryComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PageContentModule {}
