import * as BABYLON from 'babylonjs';
import { Store } from 'redux';
import { configCamera } from '../config';
import { injectCameraChanges } from './inject-camera-changes';
import { injectBlocksChanges } from './inject-blocks-changes';

export default function createScene(
    canvas: HTMLCanvasElement,
    engine: BABYLON.Engine,
    store: Store<Object>,
): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    configCamera(camera);

    const light = new BABYLON.DirectionalLight('dir01', new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 3, 20);
    light.intensity = 0.5;
    const light2 = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 1 / 2), scene);
    light2.intensity = 0.5;

    const groundMesh = BABYLON.Mesh.CreateGround('ground', 10000, 10000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadows = true;

    const shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.useExponentialShadowMap = true;

    injectCameraChanges(scene, store);
    injectBlocksChanges(scene, store);

    return scene;
}
