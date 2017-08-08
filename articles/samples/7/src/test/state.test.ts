import {createStore} from 'redux';
import {stateReducer} from '../redux-reducers/index';

const store = createStore(stateReducer, {});

describe('blocks', () => {

    it('should increase number of blocks after dispatch BLOCK_ADD', () => {
        const oldState = store.getState();
        store.dispatch({type:'BLOCK_ADD',newBlock:{}});
        const newState = store.getState();
        expect(newState.blocks.length).toBe(oldState.blocks.length+1);
    });

    it('should descrease number of blocks after dispatch BLOCK_DELETE', () => {
        const oldState = store.getState();
        store.dispatch({type:'BLOCK_DELETE',blockId:oldState.blocks[0].id});
        const newState = store.getState();
        expect(newState.blocks.length).toBe(oldState.blocks.length-1);
    });

});
/*
describe('ui', () => {

    it('should increase number of blocks after dispatch UI_DRAWER_TOGGLE', () => {
        const oldState = store.getState();
        store.dispatch({type:'BLOCK_ADD',newBlock:{}});
        const newState = store.getState();
        expect(newState.blocks.length).toBe(oldState.blocks.length+1);
    });

    it('should descrease number of blocks after dispatch UI_COLOR_SET', () => {
        const oldState = store.getState();
        store.dispatch({type:'BLOCK_DELETE',blockId:oldState.blocks[0].id});
        const newState = store.getState();
        expect(newState.blocks.length).toBe(oldState.blocks.length-1);
    });

});*/