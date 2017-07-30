import {Vector3} from '../classes/vector3';
import {Block} from '../classes/block';
import {BLOCKS_DEFAULT} from '../config';


enum ActionTypes{
    BLOCK_ADD='BLOCK_ADD',
    BLOCK_DELETE='BLOCK_DELETE',
}

export const createAction = {
    BLOCK_ADD: (block:Block)=>({type:ActionTypes.BLOCK_ADD,block}),
    BLOCK_DELETE: (id:string)=>({type:ActionTypes.BLOCK_DELETE,id}),
};


export default function blocks(blocks = BLOCKS_DEFAULT, action) {
    switch (action.type) {

        case ActionTypes.BLOCK_ADD:
            return blocks.concat([action.block]);


        case ActionTypes.BLOCK_DELETE:
            return blocks.filter((block)=>block.id!==action.id);

        default:
            return blocks;
    }
}