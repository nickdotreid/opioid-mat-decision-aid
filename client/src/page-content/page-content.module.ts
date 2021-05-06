import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from 'form/form.module';
import { ParticipantModule } from 'participant/participant.module';
import { ServerModule } from 'server/server.module';
import { AccordionEditComponent } from './accordion-edit.component';
import { ButtonEditComponent } from './button-edit.component';
import { PopoverGalleryComponent } from './popover-gallery.component';
import { QuestionEditComponent } from './question-edit.component';
import { QuestionComponent } from './question.component';
import { SummaryEditComponent } from './summary-edit.component';
import { SummaryComponent } from './summary.component';
import { TextEditComponent } from './text-edit.component';
import { TextComponent } from './text.compontent';


@NgModule({
    declarations: [
        AccordionEditComponent,
        ButtonEditComponent,
        SummaryComponent,
        SummaryEditComponent,
        TextComponent,
        TextEditComponent,
        QuestionComponent,
        QuestionEditComponent,
        PopoverGalleryComponent
    ],
    exports: [
        AccordionEditComponent,
        ButtonEditComponent,
        SummaryComponent,
        SummaryEditComponent,
        TextComponent,
        TextEditComponent,
        QuestionComponent,
        QuestionEditComponent,
        PopoverGalleryComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        FormsModule,
        ServerModule,
        ReactiveFormsModule,
        ParticipantModule
    ]
})
export class PageContentModule {}
