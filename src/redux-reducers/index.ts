import { combineReducers } from 'redux'
import * as _ from "lodash";
import blocks from './blocks'
import {environment} from './environment'
import {camera} from './camera'
import {ui} from './ui'

function lastAction(previousAction,action){
    return action;
}

const stateReducerInner = combineReducers({
    blocks,
    environment,
    camera,
    ui,
    lastAction
});

export enum ActionTypes{
    CHANGE_STATE='CHANGE_STATE',
}

export const createAction = {
    CHANGE_STATE: (state)=>({type:ActionTypes.CHANGE_STATE,state}),
};

export function stateReducer(state, action) {
    if (action.type === ActionTypes.CHANGE_STATE) {
        return _.assign({},action.state, {lastAction:action});
    } else {
        return stateReducerInner(state, action);
    }
};