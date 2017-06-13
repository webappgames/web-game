import * as Immutable from "immutable";
import {Action} from 'redux';

export default function stateReducer(state:Immutable.Map<string,any>, action:Action) {
    switch (action.type) {

        case 'BLOCK_DELETE':
            return state
                .update('blocks', (blocks)=>blocks.filter((block)=>block.get('id') !== (action as any).blockId));

        case 'BLOCK_ADD':
            let newBlockImmutable = Immutable.fromJS((action as any).newBlock);
            if (newBlockImmutable.get('color') === 'current') {
                newBlockImmutable = newBlockImmutable.set('color', state.get('currentColor'));
            }
            return state
                .update('blocks', (blocks)=>blocks.push(newBlockImmutable));

        default:
            return state;
    }
}