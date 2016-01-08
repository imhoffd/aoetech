import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

export type CivilizationId = string;
export type TechnologyId = string;
export type TechnologyType = string;

export interface Civilization {
    id: CivilizationId;
    name: string;
}

export interface Technology {
    id: TechnologyId;
    name: string,
    prerequisites: {
        age: number;
        civilizations: CivilizationId[];
        structure: TechnologyId;
    },
    type: TechnologyType;
}

export interface Data {
    civilizations: Civilization[];
    technologies: Technology[];
}

@Injectable()
export class DataService {
    protected _dataPromise: Promise<Object>;

    constructor(protected _http: Http) { }

    public getData() : Promise<Data> {
        if (this._dataPromise === undefined) {
            this._dataPromise = new Promise<Data>(resolve =>
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
