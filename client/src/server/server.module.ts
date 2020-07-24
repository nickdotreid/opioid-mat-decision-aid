import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './server.service';
import { StorageServiceModule } from 'ngx-webstorage-service';


@NgModule({
    imports: [
        HttpClientModule,
        StorageServiceModule
    ],
    providers: [
        ServerService
    ]
})
export class ServerModule {}
