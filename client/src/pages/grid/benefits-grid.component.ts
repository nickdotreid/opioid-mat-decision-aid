import { Component } from '@angular/core';
import { Effect } from '@domain/medication-effects/medication-effects.service';


@Component({
    templateUrl: './benefits-grid.component.html'
})
export class BenefitsGridComponent {

    public effects: Array<Effect>;

    constructor() {
        this.effects = [{
            key: 'symprelief',
            name: 'Symptom relief'
        }, {
            key: 'mortality',
            name: 'Effectiveness: mortality'
        }, {
            key: 'relapse',
            name: 'Effectiveness: Risk of relapse over time'
        }, {
            key: 'improvement',
            name: 'Functional improvement'
        }];
    }

}
