import * as Immutable from "immutable";
import {Action} from 'redux';
import Block from '../creators/block.ts';

const BLOCK_DELETE = 'BLOCK_DELETE';
const BLOCK_ADD = 'BLOCK_ADD';


export const createActionBlockDelete = (blockId: string)=>({
    type:BLOCK_DELETE, blockId
});//:Action
export const createActionBlockAdd = (newBlock: Immutable.Map)=>({
    type:BLOCK_ADD, newBlock
});


export default function stateReducer(state: Immutable.Map<string,any>, action: Action) {
    switch (action.type) {

        case BLOCK_DELETE:
            return state
                .update('blocks', (blocks)=>blocks.filter((block)=>block.get('id') !== (action as any).blockId));

        case BLOCK_ADD:
            return state
                .update('blocks', (blocks)=>blocks.push(action.newBlock));

        default:
            return state;
    }
}