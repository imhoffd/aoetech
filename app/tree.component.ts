import {Component, ElementRef, OnInit} from 'angular2/core';
import {DataService, Civilization, Technology} from './data.service';

@Component({
    selector: 'tree',
    template: `
        <svg
            (mousedown)="_grabbing = true"
            (mouseup)="_grabbing = false"
            [attr.width]="_windowSize.width"
            [attr.height]="_windowSize.height"
            [class.grab]="!_grabbing"
            [class.grabbing]="_grabbing">

            <g *ngFor="#technology of _technologies #i = index" [attr.transform]="'translate(' + 10 + ',' + i * 10 + ')'">
                <text>{{technology.name}}</text>
            </g>

        </svg>
        `,
    styles: [`
        svg {
            background-color: beige;
        }

        svg.grab {
            cursor: -webkit-grab;
            cursor: -moz-grab;
            cursor: grab;
        }

        svg.grabbing {
            cursor: -webkit-grabbing;
            cursor: -moz-grabbing;
            cursor: grabbing;
        }

        svg * {
            cursor: default;
        }
    `],
    providers: [ElementRef, DataService]
})
export class TreeComponent implements OnInit {
    protected _svgElement: HTMLElement;
    protected _panZoomElement: typeof svgPanZoom;
    protected _grabbing: boolean = false;

    protected _windowSize: {
        width: number;
        height: number;
    };

    protected _civilizations: Civilization[];
    protected _technologies: Technology[];

    constructor(protected _element: ElementRef, protected _dataService: DataService) {
        this._svgElement = _element.nativeElement.querySelector('svg');
    }

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

            this._panZoomElement = svgPanZoom(this._svgElement, {
                fit: false,
                // beforePan: () => { return false; },
            });
        });
    }
}
