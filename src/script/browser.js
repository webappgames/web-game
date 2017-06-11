var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);

function createScene() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1,1,1);

    const camera = new BABYLON.ArcRotateCamera("Camera",Math.PI/4, Math.PI/4, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1/2), scene);

    const materialNormal = new BABYLON.StandardMaterial("material-normal", scene);
    materialNormal.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);//Také bych mohl vyrobit barvu z hexadecimálního zápisu BABYLON.Color3.FromHexString("#666666");

    const materialHover = new BABYLON.StandardMaterial("material-hover", scene);
    materialHover.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);

    const box = BABYLON.Mesh.CreateBox("box", 1, scene);
    box.material = materialNormal;

    function onPointerUp(event) {
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            switch (event.button) {

                case 0:
                    const newBox = BABYLON.Mesh.CreateBox("box", 1, scene);
                    newBox.position = currentMesh.position.clone();

                    const diff = currentMesh.position.subtract(pickInfo.pickedPoint);
                    ['x', 'y', 'z'].forEach((dimension) => {
                        if (diff[dimension] >= 0.5 - 0.001) {
                    newBox.position[dimension]--;
                }else
                    if (diff[dimension] <= -0.5 + 0.001) {
                        newBox.position[dimension]++;
                    }
            });
            break;

        case 2:
            currentMesh.dispose();
            break;
        }

        }
    }
    function onContextMenu(event){event.preventDefault()}

    let lastMesh = null;
    function onPointerMove(event) {
        if (lastMesh) {
            lastMesh.material = materialNormal;
        }
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            currentMesh.material = materialHover;
            lastMesh = currentMesh;
        } else {
            lastMesh = null;
        }

    }


    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("contextmenu",onContextMenu, false);
    canvas.addEventListener("pointermove",onPointerMove, false);

    scene.onDispose = function(){
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        canvas.removeEventListener("pointermove", onPointerMove);
    };
    return scene;
}

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});