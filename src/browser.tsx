import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as _ from "lodash";
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
import {stateReducer,createAction,ActionTypes} from './redux-reducers/index';
import wrapReducer from './tools/wrap-reducer';
import Root from './react-components/root';
import {DEBOUNCE_STATE_TO_URI} from './config';

const store = createStore(wrapReducer(stateReducer), createStateFromUri(document.location.toString()));
const root = document.getElementById("root");
const canvas = document.getElementById("scene") as HTMLCanvasElement;
canvas.style.position='fixed';
canvas.style.top='0';
canvas.style.left='0';
canvas.style.width='100vw';
canvas.style.height='100vh';
canvas.style.touchAction='none';
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
store.subscribe(_.debounce(()=> {
    const state = store.getState();
    const uri = createUriFromState(state);
    const title = createTitleFromState(state);
    document.title = title;
    history.pushState({}, title, uri);
},DEBOUNCE_STATE_TO_URI));
store.subscribe(render);
render();
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Root />
        </MuiThemeProvider>
    </Provider>,
    root
);


window.onpopstate = function () {

    const state = createStateFromUri(document.location.toString());
    store.dispatch(createAction.CHANGE_STATE(state));

};