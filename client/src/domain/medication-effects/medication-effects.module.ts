import { NgModule } from '@angular/core';
import { MedicationEffectsService } from './medication-effects.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    providers: [
        MedicationEffectsService
    ],
    imports: [
        HttpClientModule
    ]
})
export class MedicationEffectsDomainModule {}
