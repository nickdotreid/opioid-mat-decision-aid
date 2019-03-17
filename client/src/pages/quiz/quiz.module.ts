import { NgModule } from '@angular/core';
import { QuizOpioidUsePageComponent } from './quiz-opioid-use.page';
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AnswerYesComponent } from './answer-yes.component';
import { AnswerNoComponent } from './answer-no.component';
import { IntroductionPageComponent } from './introduction.page';
import { QuizDependencyPageComponent } from './quiz-dependency.page';

const routes: Routes = [{
    path: 'quiz/introduction',
    component: IntroductionPageComponent
}, {
    path: 'quiz/1',
    component: QuizOpioidUsePageComponent
}, {
    path: 'quiz/dependency',
    component: QuizDependencyPageComponent
}, {
    path: 'quiz/yes',
    component: AnswerYesComponent
}, {
    path: 'quiz/no',
    component: AnswerNoComponent
}, {
    path: 'quiz',
    redirectTo: 'quiz/introduction',
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        AnswerNoComponent,
        AnswerYesComponent,
        IntroductionPageComponent,
        QuizOpioidUsePageComponent,
        QuizDependencyPageComponent
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
