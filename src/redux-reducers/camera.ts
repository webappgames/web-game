import {Vector3} from '../classes/vector3';
import {DEFAULT_CAMERA_FOV,DEFAULT_CAMERA_ROTATION_ALPHA,DEFAULT_CAMERA_ROTATION_BETA,DEFAULT_CAMERA_TARGET,DEFAULT_CAMERA_RADIUS} from '../config';

export enum CameraModes{
    ROTATE,
    MOVE
}

interface IRotation{
    alpha: number,
    beta: number
}

const defaultCamera = {
    mode: CameraModes.ROTATE,
    fov: DEFAULT_CAMERA_FOV,
    target: DEFAULT_CAMERA_TARGET,
    rotation: {
        alpha: DEFAULT_CAMERA_ROTATION_ALPHA,
        beta: DEFAULT_CAMERA_ROTATION_BETA,
    },
    radius: DEFAULT_CAMERA_RADIUS
};

enum ActionTypes{
    CAMERA_MODE_SET='CAMERA_MODE_SET',
    CAMERA_FOV_SET='CAMERA_FOV_SET',
    CAMERA_CHANGE='CAMERA_CHANGE',
}

export const createAction = {
    CAMERA_MODE_SET: (value:CameraModes)=>({type:ActionTypes.CAMERA_MODE_SET,value}),
    CAMERA_FOV_SET: (value:number)=>({type:ActionTypes.CAMERA_FOV_SET,value}),
    CAMERA_CHANGE: (target:Vector3,rotation:IRotation,radius:number)=>({type:ActionTypes.CAMERA_CHANGE,target,rotation,radius}),
};


export function camera(camera = defaultCamera, action) {
    return {
        mode:     action.type===ActionTypes.CAMERA_MODE_SET?action.value:camera.mode,
        fov:      action.type===ActionTypes.CAMERA_FOV_SET?action.value:camera.fov,
        target:   action.type===ActionTypes.CAMERA_CHANGE?action.target:camera.target,
        rotation: action.type===ActionTypes.CAMERA_CHANGE?action.rotation:camera.rotation,
        radius:   action.type===ActionTypes.CAMERA_CHANGE?action.radius:camera.radius,
    };
}