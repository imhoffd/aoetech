import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
    private _dataPromise: Promise<Object>;

    constructor(private _http: Http) { }

    public getData() : Promise<Object> {
        if (this._dataPromise === undefined) {
            this._dataPromise = new Promise<Object>(resolve =>
                this._http.get('/app/data.json')
                    .map(res => res.json())
                    .subscribe(
                        data => resolve(data),
                        err => console.error(err)
                    )
            );
        }

        return this._dataPromise;
    }
}
