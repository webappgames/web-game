import * as BABYLON from 'babylonjs';
import { createMaterial } from './create-material';
import { CameraModes } from '../redux-reducers/camera';

export default function updateScene(scene: BABYLON.Scene, state): void {
    const canvas = scene.getEngine().getRenderingCanvas() as any;
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.detachControl(canvas);

    if (state.camera.mode === CameraModes.MOVE) {
        camera.attachControl(canvas, true, false, 0);
    } else if (state.camera.mode === CameraModes.ROTATE) {
        camera.attachControl(canvas, true, false, 2);
    }

    camera.setTarget(new BABYLON.Vector3(state.camera.target.x, state.camera.target.y, state.camera.target.z));
    camera.alpha = state.camera.rotation.alpha;
    camera.beta = state.camera.rotation.beta;
    camera.radius = state.camera.radius;

    camera.fov = state.camera.fov;
    scene.clearColor = BABYLON.Color4.FromHexString(state.environment.skyColor + 'ff');

    const shadowRenderList = [];
    scene.lights[0]._shadowGenerator.getShadowMap().renderList = shadowRenderList;

    let groundMesh: BABYLON.AbstractMesh;
    let newMeshes = [];
    scene.meshes.forEach((mesh) => {
        if (mesh.name !== 'ground') {
            mesh.dispose();
        } else {
            newMeshes.push(mesh);
            groundMesh = mesh;
        }
    });
    scene.meshes = newMeshes;

    groundMesh.material = createMaterial(state.environment.groundColor, scene);

    (state as any).blocks.forEach((block) => {
        const newBox = BABYLON.Mesh.CreateBox(block.id, 1, scene);
        newBox.material = createMaterial(block.color, scene);
        newBox.position = new BABYLON.Vector3(block.position.x, block.position.y, block.position.z);
        shadowRenderList.push(newBox);
    });
}
