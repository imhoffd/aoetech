import {Component, ElementRef, OnInit} from 'angular2/core';
import {DataService, Civilization, TechnologyId, Technology} from './data.service';

@Component({
    selector: '[tech]',
    template: `
        <svg:g>
            <text>{{technology.name}}</text>

            <g tech
                *ngFor="#t of technologyChildrenValues"
                [technology]="t">
            </g>
        </svg:g>
    `,
    directives: [TechComponent],
    inputs: ['technology']
})
export class TechComponent implements OnInit {
    protected technology: Technology;
    protected technologyChildrenValues: Array<Technology>;

    public ngOnInit() {
        this.technologyChildrenValues = Array.from(this.technology.children.values());
    }
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
                *ngFor="#technology of technologyTreeValues #i=index"
                [attr.transform]="'translate(' + 10 + ',' + i * 100 + ')'"
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
    protected technologyTree: Map<TechnologyId, Technology>;
    protected technologyTreeValues: Array<Technology>;
    protected technologyMap: Map<TechnologyId, Technology>;

    constructor(protected element: ElementRef, protected dataService: DataService) {}

    public ngOnInit() {
        this.svgElement = this.element.nativeElement.querySelector('svg');
        window.addEventListener('resize', this.windowResizeHandler);
        this.windowResizeHandler(undefined);

        this.dataService.getData().then(data => {
            let techMap = new Map<TechnologyId, Technology>();
            let techTree = new Map<TechnologyId, Technology>();

            this.civilizations = data.civilizations;
            this.technologies = data.technologies;

            this.technologies.forEach((tech: Technology) => techMap.set(tech.id, tech));
            this.technologyMap = techMap;

            this.fulfillTechnologyTree(techTree, data.technology_tree);
            this.technologyTree = techTree;
            this.technologyTreeValues = Array.from(this.technologyTree.values());

            this.panZoomElement = svgPanZoom(this.svgElement, {
                fit: false
            });
        });
    }

    protected fulfillTechnologyTree(techTree: Map<TechnologyId, Technology>, dataTree: Object) {
        for (let i in dataTree) {
            let tech = this.technologyMap.get(i);
            let data = dataTree[i];

            tech.children = new Map<TechnologyId, Technology>();
            techTree.set(i, tech);

            if (data && data.hasOwnProperty('children')) {
                this.fulfillTechnologyTree(tech.children, data.children);
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
