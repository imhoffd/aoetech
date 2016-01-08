import {Component, OnInit} from 'angular2/core';
import {DataService, Technology} from './data.service';

@Component({
    selector: 'tree',
    template: `<svg width="1000" height="1000">{{_technologies | json}}</svg>`,
    providers: [DataService]
})
export class TreeComponent implements OnInit {
    protected _windowSize: {
        width: number;
        height: number;
    };

    protected _technologies: Technology[];

    constructor(protected _dataService: DataService) {}

    ngOnInit() {
        this._dataService.getData().then(data => {
            this._technologies = data.technologies;
        });
    }
}
