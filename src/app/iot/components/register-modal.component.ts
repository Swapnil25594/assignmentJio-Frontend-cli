import { Component, Output, EventEmitter, OnDestroy, OnInit, Inject, forwardRef, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { BsModalComponent } from 'ng2-bs3-modal';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { IOTservice } from '../services/iot-interest.service';


@Component({
    selector: 'aot-register-modal',
    templateUrl: '../templates/register-modal.component.html'

})

export class RegisterModal {

    @ViewChild('register')
    register: BsModalComponent;

    model: any = {};
    @Output() onRegistration = new EventEmitter<any>();

    constructor(private router: Router, private toaster: ToasterService, private iotservice: IOTservice) {

    }

    openRegisterModal() {
        this.model = {};
        this.register.open();
    }

    user_register() {
        this.toaster.clear();
        if (!this.model.name) {
            this.toaster.pop('error', 'Name  can not be empty');
            return;
        }
        if (!this.model.mobile ) {
            this.toaster.pop('error', 'Mobile  can not be empty');
            return;
        }
        if (!this.model.password ) {
            this.toaster.pop('error', 'Mobile  can not be empty');
            return;
        }



        let config: any = {};
        config.mobile = this.model.mobile;
        config.address = this.model.address;
        config.name = this.model.name;
        config.password = this.model.password;
        this.iotservice.register(config)
            .subscribe(
            (response) => {
                this.toaster.clear();
                this.toaster.pop('success', 'Registered');
                this.onRegistration.emit(this.model);
                this.register.close();
            },
            (err) => {
                let body = JSON.parse(err._body)
                if (body.error.statusCode == 409) {
                    this.toaster.clear();
                    this.toaster.pop('error', 'Mobile number already exist.');
                }
            },
            () => {
            }
            );
    }

}