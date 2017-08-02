const store = Redux.createStore(wrapReducer(stateReducer), createStateFromUri(document.location.toString()));
const root = document.getElementById("root");
const canvas = document.getElementById("scene");
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
    const state = store.getState();
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
    store.dispatch(createAction.CHANGE_STATE(state));
};