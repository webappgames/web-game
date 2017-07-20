import * as uuid from 'uuid';
import {Vector3} from './vector3';

export class Block{
    constructor(public id='',public position:Vector3) {
        if (this.id === '')this.id = uuid.v4();
    }
}