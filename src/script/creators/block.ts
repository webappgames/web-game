import * as Immutable from "immutable";
import * as uuid from 'uuid';

export default function createBlock(id='',position){
    if (id === '')id = uuid.v4();
    return(Immutable.Map({id,position}))
}