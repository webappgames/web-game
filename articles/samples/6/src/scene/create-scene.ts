import * as BABYLON from 'babylonjs';
import {Store} from 'redux';
import * as uuid from 'uuid';

export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine, store: Store<Object>): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromHexString('#c0faff'+'ff');

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1 / 2), scene);

    //const materialNormal = new BABYLON.StandardMaterial("material-normal", scene);
    //materialNormal.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);

    const materialHover = new BABYLON.StandardMaterial("material-hover", scene);
    materialHover.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);


    function onPointerUp(event) {
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            switch (event.button) {
                case 0:
                    const diff = currentMesh.position.subtract(pickInfo.pickedPoint);
                    const position = currentMesh.position.clone();

                    ['x', 'y', 'z'].forEach((dimension) => {
                        if (diff[dimension] >= 0.5 - 0.001) {
                            position[dimension]--;
                        } else if (diff[dimension] <= -0.5 + 0.001) {
                            position[dimension]++;
                        }
                    });

                    store.dispatch({
                        type: 'BLOCK_ADD', newBlock: {
                            id: uuid.v4(),
                            position: {
                                x: Math.floor(position.x),
                                y: Math.floor(position.y),
                                z: Math.floor(position.z)
                            },
                            color: (store.getState() as any).ui.color
                        }
                    });
                    break;

                case 2:
                    store.dispatch({type: 'BLOCK_DELETE', blockId: currentMesh.name});
                    break;
            }
        }
    }

    function onContextMenu(event) {
        event.preventDefault()
    }

    let lastMesh = null;
    let lastMaterial:BABYLON.Material = null;

    function onPointerMove(event) {
        if (lastMesh) {
            lastMesh.material = lastMaterial;
        }
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            lastMaterial = currentMesh.material;
            currentMesh.material = materialHover;
            lastMesh = currentMesh;
        } else {
            lastMesh = null;
        }

    }


    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("contextmenu", onContextMenu, false);
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        canvas.removeEventListener("pointermove", onPointerMove);
    };
    return scene;
}