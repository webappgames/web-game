import * as Immutable from "immutable";

export const WEB_NAME = 'Simple web game';
export const TITLE_SEPARATOR = ' | ';

export const DEFAULT_STATE = Immutable.fromJS({
    blocks: [{id:'My first block!!!',position:{x:0,y:0,z:0}}]
});