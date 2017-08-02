import * as _ from "lodash";

export function stateReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_STATE':
            return  _.assign({},action.state, {lastAction:action});

        case 'BLOCK_ADD':
            return {
                blocks: state.blocks.concat([action.newBlock]),
                lastAction: action
            };

        case 'BLOCK_DELETE':
            return {
                blocks: state.blocks.filter((block)=>block.id!==action.blockId),
                lastAction: action
            };

        default:
            return state;
    }
}