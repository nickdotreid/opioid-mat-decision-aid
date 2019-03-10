import { Component, OnInit, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

    public medications: Array<Medication>;
    @Input('effects') effects: Array<Effect>;

    constructor(
        private medicationEffectsService: MedicationEffectsService
    ) {}

    ngOnInit() {
        this.medicationEffectsService.medications
        .subscribe((medications) => {
            this.medications = medications;
        });
    }

}
