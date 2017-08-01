import {saveState} from './state-saver';

export default function createUriFromState(state):string{
    const key = saveState(state);
    return `#${key}`;
}