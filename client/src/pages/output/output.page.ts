import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    templateUrl: './output.page.html'
})
export class OutputPageComponent {

    public medications = [
        'Methadone',
        'Buprenorphine Sublingual',
        'Buprenorphine Injectable',
        'Buprenorphine Implant',
        'Naltrexone Injectable',
        'No medication'
    ];
    public secondMedications: Array<string>;

    public form: FormGroup;

    constructor() {
        this.secondMedications = this.medications.slice();

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
