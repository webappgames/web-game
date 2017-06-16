import * as Immutable from "immutable";
import * as uuid from 'uuid';

export function loadState(key:string):Object{
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return null;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
}
export function saveState(state:Object){
    const key = uuid.v4();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key,serializedState);
    return key;
}