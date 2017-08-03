import {loadState} from './state-saver';
import {defaultState} from './default-state';

export default function createStateFromUri(uri){
    const key = uri.split('#',2)[1];
    const state = loadState(key);
    if(state){
        return state;
    }else{
        return defaultState;
    }
}
