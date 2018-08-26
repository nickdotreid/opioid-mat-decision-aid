import { Component } from '@angular/core';

const formChoices:any = {
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
  }
};

@Component({
  selector: 'app-medication-selector',
  templateUrl: './medication-selector.component.html'
})
export class MedicationSelectorComponent {
  title = 'client';
}
