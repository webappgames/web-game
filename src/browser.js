// @flow
import * as BABYLON from 'babylonjs';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import createStateFromUri from './state/create-state-from-uri';
import createTitleFromState from './state/create-title-from-state';
import createUriFromState from './state/create-uri-from-state';
import createScene from './scene/create-scene';
import updateScene from './scene/update-scene';
import stateReducer from './state-reducers/index';
import wrapReducer from './util-functions/wrap-reducer';
import Root from './ui/root';

import './ui/style/root.scss';
/*import './style/menu-top.scss';
import './style/menu-left.scss';
import './style/footer.scss';*/


let store;
const root = document.getElementById("root");
const canvas = document.getElementById("scene");
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