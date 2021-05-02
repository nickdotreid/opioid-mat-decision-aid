import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
    selector: 'app-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnChanges {

    @Input() label: string;
    @Input() format: string;

    @Input() options: Array<string>;

    @Input() key: string;
    @Input() value: string;

    @Output() answerChanged = new EventEmitter<String>();

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    public updateValue(value: String) {
        this.answerChanged.emit(value);
    }

    public isChecked(index: number) {
        if (!this.value === undefined) {
            return false;
        }
        if (String(this.value) === String(index)) {
            return true;
        } else {
            return false;
        }
    }

}
