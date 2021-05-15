import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ParticipantService } from 'participant/participant.service';
import { ServerService } from 'server/server.service';


@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnChanges {

    @Input() selectedQuestionIDs: Array<string>;
    @Input() questionData: any;
    public summarizedQuestions: Array<any> = [];

    constructor(
        private serverService: ServerService,
        private participantService: ParticipantService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.update();
    }

    private getQuestionData(question): any {
        if (this.questionData && this.questionData[question.id]) {
            return this.questionData[question.id];
        } else {
            return {};
        }
    }

    private update() {
        this.serverService.get('questions')
        .then((questions) => {
            const summaryQuestions = [];
            questions.forEach((question) => {
                if (this.selectedQuestionIDs.includes(question.id)) {
                    const questionData = this.getQuestionData(question);
                    summaryQuestions.push({
                        id: question.id,
                        key: question.data.key,
                        label: question.data.label,
                        options: question.data.options,
                        title: questionData['title']
                    });
                }
            });
            this.participantService.getAnswers()
            .then((answers) => {
                for (const [key, value] of Object.entries(answers)) {
                    const valueIndex = Number(value);
                    summaryQuestions.forEach((question) => {
                        if (question.key === key) {
                            if (question.options && question.options[valueIndex]) {
                                question.answer = question.options[valueIndex];
                            }
                        }
                    });
                }
            });
            summaryQuestions.sort((a, b) => {
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
            this.summarizedQuestions = summaryQuestions;
        });
    }

}

