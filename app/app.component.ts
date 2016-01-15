import 'rxjs/add/operator/map';
import {Component, OnInit} from 'angular2/core';
import {DataService} from './data.service';
import {TreeComponent} from './tree.component';

@Component({
    selector: 'aoetech',
    template: `
        <h1>Age of Empires II Tech Tree</h1>
        <tree></tree>
        `,
    providers: [DataService],
    directives: [TreeComponent]
})
export class AppComponent implements OnInit {
    constructor(protected dataService: DataService) {}

    ngOnInit() {
        this.dataService.getData().then(data => console.log(data));
    }
}
