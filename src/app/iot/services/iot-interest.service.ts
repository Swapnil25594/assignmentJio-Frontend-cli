import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../../common/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class IOTservice {
    constructor(private http: Http) {

    }

    register(_config: any): Observable<any> {

        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "name": _config.name,
            "username": _config.mobile,
            "address": _config.address,
            "password": _config.password
        });

        const _response$ = this.http.post(Constant.register, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    login(_config: any): Observable<any> {

        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "username": _config.mobile,
            "password": _config.password
        });

        const _response$ = this.http.post(Constant.login, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    getUserDetailsById(): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var userid = JSON.parse(localStorage.getItem('user')).userId;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.register + '/' + userid + '?access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    write_expression(_config: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();
        var UserModelid = JSON.parse(localStorage.getItem('user')).userId;
        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "Expression": _config.expression,
            "date" : new Date()
        });

        const _response$ = this.http.post(Constant.register + '/' + UserModelid + '/AOTExpression' + 
        '?access_token=' + token, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    get_expressionList(): Observable<any> {
        //let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        // const _response$ = this.http.get(Constant.getInterestList, { headers: _headers });
        const _response$ = this.http.get(Constant.getList, { headers: _headers });
        return _response$.map(res => res);
    }

    delete_expression(_config: any): Observable<any> {
        //let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.delete(Constant.getInterestList + '/' + _config.id, { headers: _headers });
        return _response$.map(res => res);
    }

    edit_expression(_config: any): Observable<any> {
        //let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');


        let _body = JSON.stringify({
            "Expression": _config.expression,
            "date" : new Date(),
            "userModelId" : _config.userModelId
        });

        const _response$ = this.http.put(Constant.getInterestList + '/' + _config.id, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    signOut(token): Observable<any> {
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.post(Constant.signOut + '?access_token=' + token, '', { headers: _headers });
        return _response$.map(res => res);
    }

}