import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerService } from 'server/server.service';
import { Sortable } from '@shopify/draggable';


@Component({
    selector: 'app-summary-edit',
    templateUrl: './summary-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SummaryEditComponent,
        multi: true
    }]
})
export class SummaryEditComponent implements ControlValueAccessor, AfterViewInit {

    private questions: Array<any> = [];
    private selectedQuestionIDs: Array<string> = [];
    public selectedQuestions: Array<any> = [];
    public unselectedQuestions: Array<any> = [];
    @ViewChild('selectedQuestionsList') public selectedQuestionsListElement: ElementRef;

    public disabled: boolean;
    private onChange: Function;
    private onTouched: Function;

    constructor(
        private serverService: ServerService
    ) {
        this.serverService.get('questions')
        .then((questions) => {
            this.questions = questions.map((question) => {
                return {
                    'id': question.id,
                    'label': question.data.label
                };
            });
            this.updateSelectedQuestions();
        });
    }

    ngAfterViewInit() {
        if (this.selectedQuestionsListElement) {
            const sortable = new Sortable(this.selectedQuestionsListElement.nativeElement, {
                draggable: 'fieldset'
            });
            sortable.on('sortable:sorted', (event) => {
                console.log('sorted', event);
                const questionIds = this.selectedQuestionIDs.map((questionId) => questionId);
                const movedQuestionId = questionIds[event.oldIndex];
                questionIds.splice(event.oldIndex, 1);
                questionIds.splice(event.newIndex, 0, movedQuestionId);
                console.log('order changed', questionIds, this.selectedQuestionIDs);
                this.selectedQuestionIDs = questionIds;
                this.updateSelectedQuestions();
                this.updateValue();
            });
        }
    }

    public toggleSelection(questionID) {
        if (this.isSelected(questionID)) {
            console.log('aready selected');
        } else {
            this.selectedQuestionIDs.push(questionID);
        }
        this.updateValue();
    }

    public add(question) {
        if (!this.isSelected(question)) {
            this.selectedQuestionIDs.push(question.id);
            this.updateSelectedQuestions();
            this.updateValue();
        }
    }

    public remove(question) {
        if (this.isSelected(question)) {
            this.selectedQuestionIDs = this.selectedQuestionIDs.filter((questionId) => {
                return question.id !== questionId;
            });
            this.updateSelectedQuestions();
            this.updateValue();
        }
    }

    private isSelected(question) {
        if (question && question.id) {
            if (this.selectedQuestionIDs.indexOf(question.id) >= 0) {
                return true;
            }
        }
        return false;
    }

    public writeValue(data: any) {
        if (data && data.selectedQuestionIDs) {
            this.selectedQuestionIDs = data.selectedQuestionIDs;
            this.updateSelectedQuestions();
        }
    }

    private updateValue() {
        this.onChange({
            selectedQuestionIDs: this.selectedQuestionIDs.map((id) => {
                return id;
            })
        });
    }

    private updateSelectedQuestions() {
        const selectedQuestions = [];
        const unselectedQuestions = [];
        this.questions.forEach((question) => {
            if (this.isSelected(question)) {
                selectedQuestions.push(question);
            } else {
                unselectedQuestions.push(question);
            }
        });
        selectedQuestions.sort((a, b) => {
            const a_position = this.selectedQuestionIDs.indexOf(a.id);
            const b_position = this.selectedQuestionIDs.indexOf(b.id);
            if (b_position < 0 || a_position > b_position) {
                return 1;
            }
            if (a_position < 0 || b_position > a_position ) {
                return -1;
            }
            return 0;
        });
        this.selectedQuestions = selectedQuestions;
        this.unselectedQuestions = unselectedQuestions;
    }

    public registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    public setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

}
