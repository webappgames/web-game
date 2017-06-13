import * as Immutable from "immutable";
import {saveState} from './state-saver.ts';

export default function createUriFromState(state:Immutable.Map<string,any>):string{
    var key = saveState(state);
    return `#${key}`;
}