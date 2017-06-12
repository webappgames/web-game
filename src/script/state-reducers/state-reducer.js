function stateReducer(state, action) {
    switch (action.type) {

        case 'BLOCK_DELETE':
            return state
                .update('blocks', (blocks)=>blocks.filter((block)=>block.get('id') !== action.blockId));

        case 'BLOCK_ADD':
            let newBlockImmutable = Immutable.fromJS(action.newBlock);
            if (newBlockImmutable.get('color') === 'current') {
                newBlockImmutable = newBlockImmutable.set('color', state.get('currentColor'));
            }
            return state
                .update('blocks', (blocks)=>blocks.push(newBlockImmutable));

        default:
            return state;
    }
}