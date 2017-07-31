import * as BABYLON from 'babylonjs';
import * as _ from "lodash";
import {Store, Action} from 'redux';
import {createAction} from '../redux-reducers/blocks';
import {createAction as createActionCamera, CameraModes, camera} from '../redux-reducers/camera';
import {Block} from '../classes/block';
import {Vector3} from '../classes/vector3';
import {createMaterial} from './create-material';
import {COLOR_HOVER} from '../config';
import {injectCameraChanges} from './inject-camera-changes';
import {injectBlocksChanges} from './inject-blocks-changes';


export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine, store: Store<Object>): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.panningAxis = new BABYLON.Vector3(1,0,1);
    camera.upperBetaLimit = (Math.PI/2)*(9/10);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 100;


    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 3, 20);
    light.intensity = 0.5;
    const light2 = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1 / 2), scene);
    light2.intensity = 0.5;

    const materialHover = createMaterial(COLOR_HOVER,scene);

    const groundMesh = BABYLON.Mesh.CreateGround("ground", 10000, 10000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadows = true;

    const shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.useExponentialShadowMap = true;

    injectCameraChanges(scene,store);
    injectBlocksChanges(scene,store);



    /*
    todo we dont need to dispose scene
    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        canvas.removeEventListener("pointermove", onPointerMove);
    };*/
    return scene;
}