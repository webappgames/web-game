import * as BABYLON from 'babylonjs';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import createStateFromUri from './state-uri/create-state-from-uri';
import createTitleFromState from './state-uri/create-title-from-state';
import createUriFromState from './state-uri/create-uri-from-state';
import createScene from './scene/create-scene';
import updateScene from './scene/update-scene';
import stateReducer from './redux-reducers/index';
import wrapReducer from './tools/wrap-reducer';
import {Root} from './react-components/root';

let store;
const root = document.getElementById("root");
const canvas = document.getElementById("scene") as HTMLCanvasElement;
canvas.style.position='fixed';
canvas.style.top='0';
canvas.style.left='0';
canvas.style.width='100vw';
canvas.style.height='100vh';
canvas.style.touchAction='none';
const engine = new BABYLON.Engine(canvas, true);
const scene = createScene(canvas, engine, ()=>store);
engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});

function render() {
    updateScene(scene, store.getState());
}

function initializeStore() {
    store = createStore(wrapReducer(stateReducer), createStateFromUri(document.location.toString()));
    store.subscribe(()=> {
        const state = store.getState();
        const uri = createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState({}, title, uri);
    });
    store.subscribe(render);
    render();

    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        root
    )
}
window.onpopstate = initializeStore;
initializeStore();