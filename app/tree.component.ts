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
            [attr.width]="windowSize.width"
            [attr.height]="windowSize.height"
            [class.grabbing]="grabbing">

            <g tech
                *ngFor="#technology of technologies #i = index"
                [attr.transform]="'translate(' + 10 + ',' + i * 10 + ')'"
                [technology]="technology">
            </g>
        </svg>
        `,
    styles: [`
        svg {
            background-color: beige;
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
    protected svgElement: HTMLElement;
    protected panZoomElement: typeof svgPanZoom;
    protected grabbing: boolean = false;

    protected windowSize: {
        width: number;
        height: number;
    };

    protected civilizations: Civilization[];
    protected technologies: Technology[];
    protected technologyTree: Object;
    protected technologyMap: Map<string, Technology> = new Map<string, Technology>();

    constructor(protected element: ElementRef, protected dataService: DataService) {}

    public ngOnInit() {
        this.svgElement = this.element.nativeElement.querySelector('svg');
        window.addEventListener('resize', this.windowResizeHandler);
        this.windowResizeHandler(undefined);

        this.dataService.getData().then(data => {
            this.civilizations = data.civilizations;
            this.technologies = data.technologies;
            this.technologies.forEach((tech: Technology) => this.technologyMap.set(tech.id, tech));
            this.technologyTree = data.technology_tree;
            this.fulfillTechnologyTree(this.technologyTree);
            console.log(this.technologyTree);

            this.panZoomElement = svgPanZoom(this.svgElement, {
                fit: false
            });
        });
    }

    public fulfillTechnologyTree(techTree: Object) {
        for (let i in techTree) {
            if (techTree[i]) {
                Object.assign(techTree[i], this.technologyMap.get(i));
            } else {
                techTree[i] = this.technologyMap.get(i);
            }

            if (techTree[i].hasOwnProperty('children')) {
                this.fulfillTechnologyTree(techTree[i].children);
            }
        }
    }

    protected svgMouseDown(event: MouseEvent) {
        var element = document.elementFromPoint(event.screenX, event.screenY);

        if (element === this.svgElement) {
            this.grabbing = true;
            this.panZoomElement.enablePan();
        } else {
            this.panZoomElement.disablePan();
        }
    }

    protected svgMouseUp(event: MouseEvent) {
        this.grabbing = false;
        this.panZoomElement.enablePan();
    }

    protected windowResizeHandler(event) {
        this.windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}
