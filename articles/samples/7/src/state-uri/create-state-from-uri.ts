import {loadState} from './state-saver';

export default function createStateFromUri(uri){
    const key = uri.split('#',2)[1];
    const state = loadState(key);
    if(state){
        return state;
    }else{
        return {};
    }
}
