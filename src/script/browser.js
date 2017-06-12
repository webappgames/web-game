const store = Redux.createStore(stateReducer, createStateFromUri(document.location.toString()));

var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(canvas, engine);
engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});

function render() {
    const state = store.getState();
    const uri = createUriFromState(state);
    const title = createTitleFromState(state);
    document.title = title;
    history.pushState({},title,uri);

    updateScene(scene,state);
}

store.subscribe(render);
render();