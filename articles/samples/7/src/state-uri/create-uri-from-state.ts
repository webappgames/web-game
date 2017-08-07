import {saveState} from './state-saver';

export default function createUriFromState(state){
    var key = saveState(state);
    return `#${key}`;
}