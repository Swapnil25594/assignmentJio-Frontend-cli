
import {
    Component, Output, EventEmitter, OnDestroy, OnInit, Inject, forwardRef,
    trigger, state, style, transition, animate, keyframes, ViewChild
} from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { RegisterModal } from './register-modal.component';
import { IOTservice } from '../services/iot-interest.service';


@Component({
    selector: 'aot-interest-modal',
    templateUrl: '../templates/iot-interest.component.html',
    styleUrls: ['../css/iot-interest.component.css']
})

export class IOTInterestComponent implements OnInit {


    model: any = {};
    IsAuthenticate = false;
    user: any = {};
    LoggedInUser: any = {};
    InterestList: any = [];
    editInterest: any = {};

    @ViewChild(RegisterModal) registerModal: RegisterModal;

    constructor(private router: Router, private toasterService: ToasterService, private iotservice: IOTservice) {

        if (localStorage.getItem("access_Token") && localStorage.getItem("access_Token") != 'undefined') {
            this.get_expression();
        }
    }


    ngOnInit() {
        this.model = {};
        this.get_expression();

    }

    childEvent(event) {
        this.model.mobile = event.mobile;
        this.model.password = event.password;
        this.login();
    }


    register() {
        this.registerModal.openRegisterModal();
    }

    login() {
        if(!this.model.mobile){
            this.toasterService.pop('error', 'Mobile  can not be empty');
            return;
        }

        if(!this.model.password){
            this.toasterService.pop('error', 'Password  can not be empty');
            return;
        }


        let conf: any = {};
        conf.mobile = this.model.mobile;
        conf.password = this.model.password;
        this.iotservice.login(conf)
            .subscribe(
            (response) => {

                localStorage.setItem('user', response._body);
                localStorage.setItem('access_Token', JSON.parse(response._body).id);
                this.iotservice.getUserDetailsById()
                    .subscribe(
                    (response) => {
                        this.IsAuthenticate = true;
                        this.LoggedInUser = JSON.parse(response._body);
                        this.ngOnInit();
                    },
                    (err) => {
                        console.error(err);
                    },
                    () => {
                    }
                    );
                this.toasterService.clear();
                this.toasterService.pop('success', 'Logged in successfully');
            },
            (err) => {
                console.error(err);
                this.toasterService.clear();
                this.toasterService.pop('error', 'Log in failed');
            },
            () => {
            }
            );
    }

    logout() {
        let token = localStorage.getItem('access_Token');
        localStorage.clear();
        this.IsAuthenticate = false;

        this.iotservice.signOut(token)
            .subscribe(
            (response) => {
                this.toasterService.clear();
                this.toasterService.pop('success', ' Signed out successfully');
                this.ngOnInit();
            },
            (err) => {
                // console.error(err);
                // this.toasterService.pop('error', ' Signed out failed');
            },
            () => {
            }
            );



    }

    write_expression() {
        if (!this.IsAuthenticate) {
            this.toasterService.clear();
            this.toasterService.pop('error', 'Please register or Sign in.');
            this.model = {};
            return;
        }
        if (this.model.expression == 'undefined') {
            this.model = {};
            return;
        }
        let conf: any = {};
        conf.expression = this.model.expression;
        this.iotservice.write_expression(conf)
            .subscribe(
            (response) => {
                this.model = {};
                //this.toasterService.clear();
                //this.toasterService.pop('success', 'comment added successfully');
                this.ngOnInit();
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    get_expression() {

        this.iotservice.get_expressionList()
            .subscribe(
            (response) => {
                // this.InterestList = JSON.parse(response._body);
                this.InterestList = JSON.parse(response._body).body;
                this.InterestList.forEach(interest => {
                    if (JSON.parse(localStorage.getItem('user'))) {
                        if (interest.userModelId == JSON.parse(localStorage.getItem('user')).userId) {
                            interest.IsLoggedInUser = true;
                        } else {
                            interest.IsLoggedInUser = false;
                        }
                    }
                    interest.date = new Date(interest.date).getMonth() + 1 + "/" + new Date(interest.date).getDate() + "/"
                        + new Date(interest.date).getFullYear() + " " + new Date(interest.date).getHours() + ":" + new Date(interest.date).getMinutes()
                        + ":" + new Date(interest.date).getSeconds();
                });
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    delete_expression(id) {
        let conf: any = {};
        conf.id = id;

        this.iotservice.delete_expression(conf)
            .subscribe(
            (response) => {
                //this.toasterService.clear();
                //this.toasterService.pop('success', 'Deleted successfully.');
                this.ngOnInit();
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    edit_expression(interest) {
        let conf: any = {};
        conf.id = interest.id;
        conf.expression = interest.Expression;
        conf.userModelId = interest.userModelId;
        this.iotservice.edit_expression(conf)
            .subscribe(
            (response) => {
                //this.toasterService.clear();
                //this.toasterService.pop('success', 'Edited successfully.');
                this.ngOnInit();
                this.editInterest = {};
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }
}
