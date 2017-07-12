function stateReducer(state, action) {
    switch (action.type) {

        case 'BLOCK_ADD':
            return {
                blocks: state.blocks.concat([action.newBlock])
            };

        case 'BLOCK_DELETE':
            return {
                blocks: state.blocks.filter((block)=>block.id!==action.blockId)
            };

        default:
            return state;
    }
}