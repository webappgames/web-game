import { combineReducers } from 'redux'
import blocks from './blocks'
import {environment} from './environment'
import {camera} from './camera'
import {ui} from './ui'

const stateReducerInner = combineReducers({
    blocks,
    environment,
    camera,
    ui
});

export enum ActionTypes{
    CHANGE_STATE='CHANGE_STATE',
}

export const createAction = {
    CHANGE_STATE: (state)=>({type:ActionTypes.CHANGE_STATE,state}),
};

export function stateReducer(state, action) {
    if (action.type === ActionTypes.CHANGE_STATE) {
        return action.state;
    } else {
        return stateReducerInner(state, action);
    }
};