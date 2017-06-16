import * as uuid from 'uuid';

export default function createBlock(id='',position){
    if (id === '')id = uuid.v4();
    return {id,position}
}

