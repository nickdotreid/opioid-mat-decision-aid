import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectComponent } from './effect.component';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { CravingEffectivenessComponent } from './craving-effectiveness.component';
import { RiskOfDeathComponent } from './risk-of-death.component';
import { LocationComponent } from './location.component';



@NgModule({
    imports: [
        BrowserModule,
        MedicationEffectsDomainModule
    ],
    declarations: [
        CravingEffectivenessComponent,
        EffectComponent,
        LocationComponent,
        RiskOfDeathComponent
    ],
    exports: [
        CravingEffectivenessComponent,
        EffectComponent,
        LocationComponent,
        RiskOfDeathComponent
    ]
})
export class MedicationEffectsComponentModule {}
