import * as BABYLON from 'babylonjs';
import * as _ from 'lodash';
import { Store } from 'redux';
import { createAction as createActionCamera } from '../redux-reducers/camera';
import { Vector3 } from '../classes/vector3';

export function injectCameraChanges(scene: BABYLON.Scene, store: Store<Object>) {
    const canvas = scene.getEngine().getRenderingCanvas() as any;
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;

    let lastCamera;
    function dumpCamera() {
        return {
            position: new Vector3(camera.target.x, camera.target.y, camera.target.z),
            rotation: {
                alpha: camera.alpha,
                beta: camera.beta,
            },
            radius: camera.radius,
        };
    }
    canvas.addEventListener(
        'pointerdown',
        () => {
            lastCamera = dumpCamera();
        },
        false,
    );
    canvas.addEventListener(
        'pointerup',
        () => {
            const thisCamera = dumpCamera();
            if (!_.isEqual(thisCamera, lastCamera)) {
                store.dispatch(
                    createActionCamera.CAMERA_CHANGE(thisCamera.position, thisCamera.rotation, thisCamera.radius),
                );
            }
        },
        false,
    );
}
