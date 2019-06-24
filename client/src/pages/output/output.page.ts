import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicationEffectsService, Effect, Medication } from '@domain/medication-effects/medication-effects.service';
import { Option } from '@components/form/option.model';

@Component({
    selector: 'app-output-page',
    templateUrl: './output.page.html'
})
export class OutputPageComponent {

    public medications: Array<Option>;
    public secondMedications: Array<Option>;

    public attributes: Array<string>;

    public form: FormGroup;

    constructor(
        private medicationEffectsService: MedicationEffectsService
    ) {
        this.medicationEffectsService.medications
        .subscribe((medications) => {
            if (medications) {
                this.medications = medications.map((medication) => {
                    return new Option(medication.name, medication.key);
                });
                this.secondMedications = this.medications.slice();
            }
        });

        this.attributes = [
            'Symptom relief',
            'Mortality',
            'Risk of relapse',
            'Impact on my function',
            'How hard it is to start the medication',
            'Convenience',
            'How the medication gets in my body',
            'Side effects',
            'Cost',
            'Withdrawl symptoms if I stop this medication on my own'
        ];

        this.form = new FormGroup({
            favorite: new FormControl(undefined, Validators.required),
            secondFavorite: new FormControl(undefined, Validators.required)
        });

        this.form.valueChanges.subscribe(() => {
            this.secondMedications = this.medications.filter((medication) => {
                if (medication === this.form.value.favorite) {
                    return false;
                } else {
                    return true;
                }
            });
        });
    }

}
