import { Component } from '@angular/core';
import { Effect } from '@domain/medication-effects/medication-effects.service';


@Component({
    templateUrl: './demand-grid.component.html'
})
export class DemandGridComponent {

    public effects: Array<Effect>;

    constructor() {
        this.effects = [{
            key: 'treatment',
            name: 'How do I start treatment?'
        }, {
            key: 'refill',
            name: 'How do I pick up the medication?'
        }, {
            key: 'side-effects',
            name: 'Common side effects'
        }, {
            key: 'cost',
            name: 'Cost without insurance'
        }];
    }

}
