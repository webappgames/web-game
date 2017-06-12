let store;
const canvas = document.getElementById("scene");
const engine = new BABYLON.Engine(canvas, true);
const scene = createScene(canvas, engine);
engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});

function render() {
    updateScene(scene,store.getState());
}

function createStore(){
    store = Redux.createStore(stateReducer, createStateFromUri(document.location.toString()));
    store.subscribe(()=>{
        const state = store.getState();
        const uri = createUriFromState(state);
        const title = createTitleFromState(state);
        document.title = title;
        history.pushState({},title,uri);
    });
    store.subscribe(render);
    render();
}
window.onpopstate = createStore;
createStore();