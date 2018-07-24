import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';
import { BsModalModule } from 'ng2-bs3-modal';
import { ScrollEventModule } from 'ngx-scroll-event';

import { IOTInterestComponent } from './components/iot-interest.component';
import { RegisterModal } from './components/register-modal.component';
import { IOTRouting } from './iot.routing';
import {IOTservice} from './services/iot-interest.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, HttpModule, JsonpModule, BsModalModule, ScrollEventModule, IOTRouting],
    declarations: [IOTInterestComponent, RegisterModal],
    providers: [IOTservice],
    exports: [IOTInterestComponent, RegisterModal]
})
export class IOTModule { }