import * as BABYLON from 'babylonjs';
import {Store, Action} from 'redux';
import {createAction} from '../redux-reducers/blocks';
import {Block} from '../classes/block';
import {Vector3} from '../classes/vector3';



export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine, getStore: ()=>Store<Object>): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = (Math.PI/2)*(9/10);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 100;


    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 3, 20);
    light.intensity = 0.5;
    const light2 = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1 / 2), scene);
    light2.intensity = 0.5;

    const materialHover = new BABYLON.StandardMaterial("material-hover", scene);
    materialHover.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);

    const materialGround = new BABYLON.StandardMaterial("material-ground", scene);
    materialGround.diffuseColor = new BABYLON.Color3(0.6, 0.9, 0.4);
    //materialGround.backFaceCulling = false;

    const ground = BABYLON.Mesh.CreateGround("ground", 10000, 10000, 2, scene);
    ground.material = materialGround;
    ground.receiveShadows = true;


    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    //shadowGenerator.useExponentialShadowMap = true;
    //shadowGenerator.usePoissonSampling = true;



    function onPointerUp(event) {
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            if(currentMesh.name==='ground')return;

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

                    getStore().dispatch(
                        createAction.BLOCK_ADD(
                            new Block(
                                undefined,
                                new Vector3(
                                    Math.floor(position.x),
                                    Math.floor(position.y),
                                    Math.floor(position.z)
                                ),
                                (getStore().getState() as any).ui.color
                            )
                        )
                    );

                    break;

                case 2:
                    getStore().dispatch(createAction.BLOCK_DELETE(currentMesh.name));
                    break;
            }
        }
    }

    function onContextMenu(event) {
        event.preventDefault()
    }

    let lastMesh = null;
    let lastMaterial:BABYLON.Material;

    function onPointerMove(event) {
        if (lastMesh) {
            lastMesh.material = lastMaterial;
        }
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            if(currentMesh.name==='ground')return;
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