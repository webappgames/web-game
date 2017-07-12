let store;
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
    const initialState = createStateFromUri(document.location.toString());
    document.title = createTitleFromState(initialState);
    store = Redux.createStore(wrapReducer(stateReducer), initialState);

    store.subscribe(()=> {
        const state = store.getState();
        const uri = createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState({}, title, uri);
    });
    store.subscribe(render);
    render();
}
initializeStore();

window.onpopstate = initializeStore;