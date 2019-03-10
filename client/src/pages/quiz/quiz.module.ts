import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AnswerYesComponent } from './answer-yes.component';
import { AnswerNoComponent } from './answer-no.component';

const routes: Routes = [{
    path: 'quiz/1',
    component: QuizComponent
}, {
    path: 'quiz/yes',
    component: AnswerYesComponent
}, {
    path: 'quiz/no',
    component: AnswerNoComponent
}, {
    path: 'quiz',
    redirectTo: 'quiz/1',
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        AnswerNoComponent,
        AnswerYesComponent,
        QuizComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class QuizModule {}
