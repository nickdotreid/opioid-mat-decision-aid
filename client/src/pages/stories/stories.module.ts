import { NgModule } from "@angular/core";
import { MedicationSelectorComponent } from "./medication-selector.component";
import { StoryModalComponent, StoryListComponent } from "./story-list.component";
import { MatCardModule, MatRadioModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
    declarations: [
        MedicationSelectorComponent,
        StoryModalComponent,
        StoryListComponent
    ],
    imports: [
        BrowserModule,
        MatCardModule,
        MatRadioModule,
        ReactiveFormsModule
    ]
})
export class StoriesModule {}
