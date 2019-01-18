import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectComponent } from './effect.component';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';



@NgModule({
    imports: [
        BrowserModule,
        MedicationEffectsDomainModule
    ],
    declarations: [
        EffectComponent
    ],
    exports: [
        EffectComponent
    ]
})
export class MedicationEffectsComponentModule {}
