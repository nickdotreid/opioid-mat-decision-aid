import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectComponent } from './effect.component';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { CravingEffectivenessComponent } from './craving-effectiveness.component';



@NgModule({
    imports: [
        BrowserModule,
        MedicationEffectsDomainModule
    ],
    declarations: [
        CravingEffectivenessComponent,
        EffectComponent
    ],
    exports: [
        CravingEffectivenessComponent,
        EffectComponent
    ]
})
export class MedicationEffectsComponentModule {}
