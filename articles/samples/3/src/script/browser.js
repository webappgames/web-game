const store = Redux.createStore(stateReducer, defaultState);

var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(canvas, engine);

function render() {
    updateScene(scene, store.getState());
}

store.subscribe(render);
render();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});