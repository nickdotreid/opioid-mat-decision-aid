import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const attributes: any = {
  initiation: {
    startRightAway: {
      MMT: 2,
      NTXXR: 1
    },
    startAfter2Days: {
      BPNSL: 2,
      BPNINJ: 1,
      BPNIMP: 1
    },
    startAfter2DaysThen: {
      BPNINJ: 2,
      BPNIMP: 2
    },
    detoxThenINJ: {
      NTXXR: 1
    }
  },
  sideEffects: {
    weightGain: {
      MMT: 2
    },
    drowsy: {
      MMT: 2
    },
    constipation: {
      MMT: 2
    },
    headaches: {
      BPNSL: 2,
      BPNINJ: 2,
      BPNIMP: 2
    },
    insomnia: {
      BPNSL: 2,
      BPNINJ: 2,
      BPNIMP: 2
    },
    irritationAtSite: {
      BPNSL: 2,
      BPNINJ: 2,
      BPNIMP: 2
    }
  },
  withdrawlSymptoms: {
    lessSevere: {
      MMT: 2
    },
    milder: {
      BPNSL: 2
    },
    headaches: {
      BPNINJ: 2,
      BPNIMP: 2,
      NTXXR: 2
    }
  }
};

@Component({
  selector: 'app-medication-selector',
  templateUrl: './medication-selector.component.html'
})
export class MedicationSelectorComponent {
  title = 'client';
  medications: Array<string>;

  featuresForm = this.fb.group({
    initiation: ['required'],
    sideEffects: [''],
    withdrawlSymptoms: ['']
  });

  constructor(
    private fb: FormBuilder
  ) {}

  rankMedications(preferences: any) {
    const medicationScores: any = {};

    Object.keys(attributes).forEach((key: string) => {
      const attributePreference: any = preferences[key];
      if (attributePreference) {
        const score: any = attributes[key][attributePreference];
        if (score) {
          Object.keys(score).forEach((medication) => {
            if (!medicationScores[medication]) {
              medicationScores[medication] = 0;
            }
            medicationScores[medication] += score[medication];
          });
        }
      }
    });

    const medications: Array<string> = [];
    Object.keys(medicationScores).forEach((medication: string) => {
      medications.push(medication);
    });
    medications.sort((medA, medB) => {
      if (medicationScores[medA] >= medicationScores[medB]) {
        return 1;
      } else {
        return -1;
      }
    });

    return medications;
  }

  updatePreferences() {
    if (this.featuresForm.valid) {
      this.medications = this.rankMedications({
        initiation: this.featuresForm.get('initiation').value,
        withdrawlSymptoms: this.featuresForm.get('withdrawlSymptoms').value
      });
    }
  }
}
