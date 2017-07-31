import * as BABYLON from 'babylonjs';
import * as _ from "lodash";
import {Store, Action} from 'redux';
import {createAction} from '../redux-reducers/blocks';
import {createAction as createActionCamera, CameraModes, camera} from '../redux-reducers/camera';
import {Block} from '../classes/block';
import {Vector3} from '../classes/vector3';
import {createMaterial} from './create-material';
import {COLOR_HOVER} from '../config';


export function injectCameraChanges(scene:BABYLON.Scene,store:Store){

    const canvas = scene.getEngine().getRenderingCanvas() as HTMLCanvasElement;
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;

    let lastCamera;
    function dumpCamera(){
        return {
            position: new Vector3(
                camera.target.x,
                camera.target.y,
                camera.target.z
            ),
            rotation: {
                alpha: camera.alpha,
                beta: camera.beta,
            },
            radius: camera.radius
        };
    }
    canvas.addEventListener("pointerdown",()=>{
        lastCamera = dumpCamera();
    }, false);
    canvas.addEventListener("pointerup",()=>{
        const thisCamera = dumpCamera();
        if(!_.isEqual(thisCamera,lastCamera)){
            store.dispatch(createActionCamera.CAMERA_CHANGE(thisCamera.position,thisCamera.rotation,thisCamera.radius));
        }
    }, false);
}