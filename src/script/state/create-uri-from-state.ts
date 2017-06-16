import * as Immutable from "immutable";
import {saveState} from './state-saver.ts';

export default function createUriFromState(state):string{
    var key = saveState(state);
    return `#${key}`;
}