import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicationEffectsService, Effect, Medication } from '@domain/medication-effects/medication-effects.service';

@Component({
    templateUrl: './medication-grid.page.html',
    styleUrls: [
        './medication-grid.page.scss'
    ]
})
// tslint:disable-next-line:component-class-suffix
export class MedicationGridPage implements OnInit, OnDestroy {
    title = 'Grid';

    public treating: Boolean = false;
    public treatmentDay: Number = undefined;
    public currentDay: Number = 0;

    public days: Array<number> = [0, 2, 7, 14, 30, 90];

    public medications: Array<Medication>;
    public effects: Array<Effect>;

    constructor(
        private medicationEffectsService: MedicationEffectsService
    ) {}

    ngOnInit() {
        this.medicationEffectsService.effects
        .subscribe((effects: Array<Effect>) => {
            this.effects = effects;
        });

        this.medicationEffectsService.medications
        .subscribe((medications: Array<Medication>) => {
            this.medications = medications;
        });
    }

    ngOnDestroy() {
        console.log('good bye!');
    }

    public startTreatment() {
        this.treating = true;
        this.updateTreatmentDay();
    }

    public stopTreatment() {
        this.treating = false;
        this.updateTreatmentDay();
    }

    public updateDay(day: number) {
        this.currentDay = day;
        this.updateTreatmentDay();
    }

    private updateTreatmentDay() {
        if (this.treating) {
            this.treatmentDay = this.currentDay;
        } else {
            this.treatmentDay = undefined;
        }
    }
}
