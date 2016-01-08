import {Component, ElementRef, OnInit} from 'angular2/core';
import {DataService, Civilization, Technology} from './data.service';

@Component({
    selector: 'tree',
    template: `
        <svg [attr.width]="_windowSize.width" [attr.height]="_windowSize.height">
            <g *ngFor="#technology of _technologies #i = index" [attr.transform]="'translate(' + 10 + ',' + i * 10 + ')'">
                <text>{{technology.name}}</text>
            </g>
        </svg>
        `,
    providers: [DataService]
})
export class TreeComponent implements OnInit {
    protected _windowSize: {
        width: number;
        height: number;
    };

    protected _civilizations: Civilization[];
    protected _technologies: Technology[];

    constructor(protected _dataService: DataService) {}

    protected _windowResizeHandler(event) {
        this._windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    ngOnInit() {
        window.addEventListener('resize', this._windowResizeHandler);
        this._windowResizeHandler(undefined);

        this._dataService.getData().then(data => {
            this._civilizations = data.civilizations;
            this._technologies = data.technologies;
        });
    }
}
