const defaultBlocks = [{id: 'My first block!!!', position: {x: 0, y: 0, z: 0}}];//todo createBlock


const BLOCK_DELETE = 'BLOCK_DELETE';
const BLOCK_ADD = 'BLOCK_ADD';


export function createActionBlockDelete(blockId: string) {
    return {
        type: BLOCK_DELETE, blockId
    }
}
export function createActionBlockAdd(newBlock: Object) {
    return {
        type: BLOCK_ADD, newBlock
    }
}


export default function blocks(blocks = [], action) {
    switch (action.type) {

        case BLOCK_ADD:
            return blocks.concat([action.newBlock]);


        case BLOCK_DELETE:
            return blocks.filter((block)=>block.id!==action.blockId);

        default:
            return blocks;
    }
}