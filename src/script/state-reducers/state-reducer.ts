import * as Immutable from "immutable";
import {Action} from 'redux';
import Block from '../classes/block.ts';

const BLOCK_DELETE = 'BLOCK_DELETE';
const BLOCK_ADD = 'BLOCK_ADD';

export const createActionBlockDelete = (blockId: string)=> {
    type:BLOCK_DELETE, blockId
};//:Action
export const createActionBlockAdd = (newBlock: Block)=> {
    type:BLOCK_Add, newBlock
};


export default function stateReducer(state: Immutable.Map<string,any>, action: Action) {
    switch (action.type) {

        case BLOCK_DELETE:
            return state
                .update('blocks', (blocks)=>blocks.filter((block)=>block.get('id') !== (action as any).blockId));

        case BLOCK_ADD:
            const newBlockImmutable = Immutable.fromJS((action as any).newBlock);
            return state
                .update('blocks', (blocks)=>blocks.push(newBlockImmutable));

        default:
            return state;
    }
}