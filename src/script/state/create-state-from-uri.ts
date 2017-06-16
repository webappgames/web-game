import * as Immutable from "immutable";
import {loadState} from './state-saver.ts';

export default function createStateFromUri(uri:string):Object{
    const key = uri.split('#',2)[1];
    const state = loadState(key);
    if(state){
        return state;
    }else{
        return {};
    }
}