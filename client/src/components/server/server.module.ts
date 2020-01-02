import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './server.service';


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ServerService
    ]
})
export class ServerModule {}
