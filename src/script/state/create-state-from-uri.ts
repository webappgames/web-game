import * as Immutable from "immutable";
import {loadState} from './state-saver.ts';
import {DEFAULT_STATE} from '../config.ts';

export default function createStateFromUri(uri:string):Immutable.Map<string,any>{
    const key = uri.split('#',2)[1];
    const state = loadState(key);
    if(state){
        return state;
    }else{
        return DEFAULT_STATE;
    }
}