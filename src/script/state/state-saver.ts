import * as Immutable from "immutable";
import * as uuid from 'uuid';

export function loadState(key:string):Immutable.Map<string,any>{
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return null;
        }
        return Immutable.fromJS(JSON.parse(serializedState));
    } catch (err) {
        return null;
    }
}
export function saveState(state:Immutable.Map<string,any>){
    const key = uuid.v4();
    const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem(key,serializedState);
    return key;
}