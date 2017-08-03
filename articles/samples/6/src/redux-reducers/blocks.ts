const defaultBlocks = [{id:'My first block!!!',position:{x:0,y:0,z:0},color:'#cccccc'}];

export default function blocks(blocks = defaultBlocks, action) {
    switch (action.type) {

        case 'BLOCK_ADD':
            return blocks.concat([action.block]);


        case 'BLOCK_DELETE':
            return blocks.filter((block)=>block.id!==action.id);

        default:
            return blocks;
    }
}