import {Component, ElementRef, OnInit} from 'angular2/core';
import {DataService, Civilization, Technology} from './data.service';

@Component({
selector: '[tech]',
    template: `
        <svg:g>
            <text>{{technology.name}}</text>
        </svg:g>
    `,
    inputs: ['technology']
})
class TechComponent {
}

@Component({
    selector: 'tree',
    template: `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            (mousedown)="svgMouseDown($event)"
            (mouseup)="svgMouseUp($event)"
            [attr.width]="_windowSize.width"
            [attr.height]="_windowSize.height"
            [class.grab]="!_grabbing"
            [class.grabbing]="_grabbing">

            <g tech
                *ngFor="#technology of _technologies #i = index"
                [attr.transform]="'translate(' + 10 + ',' + i * 10 + ')'"
                [technology]="technology">
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
    directives: [TechComponent],
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

    protected svgMouseDown(event: MouseEvent) {
        var element = document.elementFromPoint(event.screenX, event.screenY);

        if (element === this._svgElement) {
            this._grabbing = true;
            this._panZoomElement.enablePan();
        } else {
            this._panZoomElement.disablePan();
        }
    }

    protected svgMouseUp(event: MouseEvent) {
        this._grabbing = false;
        this._panZoomElement.enablePan();
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
                fit: false
            });
        });
    }
}
