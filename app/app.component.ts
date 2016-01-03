import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {DataService} from './data.service';

@Component({
    selector: 'aoetech',
    template: '<h1>Age of Empires II Tech Tree</h1>',
    providers: [DataService]
})
export class AppComponent {
    constructor(dataService: DataService) {
        dataService.getRaw()
            .subscribe(data => console.log(data), err => console.error(err));
    }
}
