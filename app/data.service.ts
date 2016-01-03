import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataService {
    private http: Http;
    private data$: Observable<Response>;

    constructor(http: Http) {
        this.http = http;
        this.data$ = this.http.get('/app/data.json');
    }

    public getRaw() : Observable<Object> {
        return this.data$.map(res => res.json());
    }
}
