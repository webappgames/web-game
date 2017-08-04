import './style/index.css';
import * as BABYLON from 'babylonjs';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import createStateFromUri from './state-uri/create-state-from-uri';
import createTitleFromState from './state-uri/create-title-from-state';
import createUriFromState from './state-uri/create-uri-from-state';
import createScene from './scene/create-scene';
import updateScene from './scene/update-scene';
import {stateReducer} from './redux-reducers/state-reducer';
import {wrapReducer} from './tools/wrap-reducer';

const store = createStore(wrapReducer(stateReducer), createStateFromUri(document.location.toString()));
const canvas = document.getElementById("scene") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = createScene(canvas, engine, store);
engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});

function render() {
    updateScene(scene, store.getState());
}
store.subscribe(()=> {
    const state = store.getState() as any;
    if (state.lastAction.type !== 'CHANGE_STATE') {
        const uri = createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState({}, title, uri);
    }
});


store.subscribe(render);
render();

window.onpopstate = function () {
    const state = createStateFromUri(document.location.toString());
    store.dispatch({type:'CHANGE_STATE',state});
};