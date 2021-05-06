import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChapterService } from 'chapters/chapters.service';
import { ServerService } from 'server/server.service';


@Component({
    selector: 'app-summary-edit',
    templateUrl: './summary-edit.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SummaryEditComponent,
        multi: true
    }]
})
export class SummaryEditComponent implements ControlValueAccessor {

    public questions: Array<any> = [];
    public selectedQuestionIDs: Array<string> = [];

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
        });
    }

    public toggleSelection(questionID) {
        if (this.isSelected(questionID)) {
            console.log('aready selected');
        } else {
            this.selectedQuestionIDs.push(questionID);
        }
        this.updateValue();
    }

    public isSelected(questionID) {
        if (this.selectedQuestionIDs.indexOf(questionID) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    public writeValue(data: any) {
        console.log('summary got data', data);
        if (data && data.selectedQuestionIDs) {
            this.selectedQuestionIDs = data.selectedQuestionIDs;
        }
    }

    private updateValue() {
        this.onChange({
            selectedQuestionIDs: this.selectedQuestionIDs.map((id) => {
                return id;
            })
        });
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
