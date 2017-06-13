import * as BABYLON from 'babylonjs';
import {createStore} from 'redux';
import createStateFromUri from './state/create-state-from-uri.ts';
import createTitleFromState from './state/create-title-from-state.ts';
import createUriFromState from './state/create-uri-from-state.ts';
import createScene from './scene/create-scene.ts';
import updateScene from './scene/update-scene.ts';
import stateReducer from './state-reducers/state-reducer.ts';
import Root from './ui/root.tsx';

let store;
const root = document.getElementById("root") as HTMLDivElement;
const canvas = document.getElementById("scene") as HTMLCanvasElement;
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
    store = createStore(stateReducer, createStateFromUri(document.location.toString()));
    store.subscribe(()=> {
        const state = store.getState();
        const uri = createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState({}, title, uri);
    });
    store.subscribe(render);
    render();


    render(
        <Provider store={store}>
            <Root />
        </Provider>,
        root
    )
}
window.onpopstate = initializeStore;
initializeStore();