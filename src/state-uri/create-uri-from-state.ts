// @flow
import {saveState} from './state-saver';

export default function createUriFromState(state):string{
    var key = saveState(state);
    return `#${key}`;
}