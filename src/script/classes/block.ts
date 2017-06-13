import Position3 from './position3.ts';
import * as uuid from 'uuid';

export default class Block{
    constructor(public id='',public position:Position3){
        if(this.id==='')this.id=uuid.v4();
    }
}