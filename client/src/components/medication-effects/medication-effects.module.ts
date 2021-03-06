import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectComponent } from './effect.component';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { CravingEffectivenessComponent } from './craving-effectiveness.component';
import { RiskOfDeathComponent } from './risk-of-death.component';
import { LocationComponent } from './location.component';
import { CravingsComponent } from './cravings.component';
import { SideEffectsComponent } from './side-effects.component';
import { LineChartComponent } from './line-chart.component';
import { CheckboxComponent } from './checkbox.component';
import { BubbleComponent } from './bubble.component';



@NgModule({
    imports: [
        BrowserModule,
        MedicationEffectsDomainModule
    ],
    declarations: [
        BubbleComponent,
        CravingsComponent,
        CravingEffectivenessComponent,
        CheckboxComponent,
        EffectComponent,
        LineChartComponent,
        LocationComponent,
        RiskOfDeathComponent,
        SideEffectsComponent
    ],
    exports: [
        CravingsComponent,
        CravingEffectivenessComponent,
        CheckboxComponent,
        EffectComponent,
        LocationComponent,
        RiskOfDeathComponent,
        SideEffectsComponent
    ]
})
export class MedicationEffectsComponentModule {}
