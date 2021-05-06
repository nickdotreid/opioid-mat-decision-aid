import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ParticipantService } from 'participant/participant.service';
import { ServerService } from 'server/server.service';


@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnChanges {

    @Input() selectedQuestionIDs: Array<string>;
    public summarizedQuestions: Array<any> = [];

    constructor(
        private serverService: ServerService,
        private participantService: ParticipantService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.update();
    }

    private update() {
        this.serverService.get('questions')
        .then((questions) => {
            const summaryQuestions = [];
            questions.forEach((question) => {
                if (this.selectedQuestionIDs.includes(question.id)) {
                    summaryQuestions.push({
                        id: question.id,
                        key: question.data.key,
                        label: question.data.label,
                        options: question.data.options
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
            this.summarizedQuestions = summaryQuestions;
        });
    }

}

