import * as Immutable from "immutable";
import * as BABYLON from 'babylonjs';
import {Store, Action} from 'redux';
import * as uuid from 'uuid';

export default function createScene(canvas:HTMLCanvasElement, engine:BABYLON.Engine, getStore:()=>Store<Immutable.Map<string,any>>):BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1 / 2), scene);

    const materialNormal = new BABYLON.StandardMaterial("material-normal", scene);
    materialNormal.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);//Také bych mohl vyrobit barvu z hexadecimálního zápisu BABYLON.Color3.FromHexString("#666666");

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

                    getStore().dispatch({
                        type: 'BLOCK_ADD', newBlock: {
                            id: uuid.v4(),
                            position: {
                                x: Math.floor(position.x),
                                y: Math.floor(position.y),
                                z: Math.floor(position.z)
                            }
                        }
                    } as Action);
                    break;

                case 2:
                    getStore().dispatch({type: 'BLOCK_DELETE', blockId: currentMesh.name} as Action);
                    break;
            }
        }
    }

    function onContextMenu(event) {
        event.preventDefault()
    }

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
    canvas.addEventListener("contextmenu", onContextMenu, false);
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        canvas.removeEventListener("pointermove", onPointerMove);
    };
    return scene;
}