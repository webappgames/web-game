import {Vector3} from '../classes/vector3';

export enum CameraModes{
    ROTATE,
    MOVE,
    FPS,
}

const defaultCamera = {
    mode: CameraModes.ROTATE,
    fov: 1.3,
    position: new Vector3(0,0,0),
    rotation: new Vector3(0,0,0),
    radius: 10
};

enum ActionTypes{
    CAMERA_MODE_SET='CAMERA_MODE_SET',
    CAMERA_FOV_SET='CAMERA_FOV_SET',
    CAMERA_POSITION_SET='CAMERA_POSITION_SET',
    CAMERA_ROTATION_SET='CAMERA_ROTATION_SET',
    CAMERA_RADIUS_SET='CAMERA_RADIUS_SET',
}

export const createAction = {
    CAMERA_MODE_SET: (value:CameraModes)=>({type:ActionTypes.CAMERA_MODE_SET,value}),
    CAMERA_FOV_SET: (value:number)=>({type:ActionTypes.CAMERA_FOV_SET,value}),
    CAMERA_POSITION_SET: (value:Vector3)=>({type:ActionTypes.CAMERA_POSITION_SET,value}),
    CAMERA_ROTATION_SET: (value:Vector3)=>({type:ActionTypes.CAMERA_ROTATION_SET,value}),
    CAMERA_RADIUS_SET: (value:number)=>({type:ActionTypes.CAMERA_RADIUS_SET,value}),
};


export function camera(camera = defaultCamera, action) {
    return {
        mode:     action.type===ActionTypes.CAMERA_MODE_SET?action.value:camera.mode,
        fov:      action.type===ActionTypes.CAMERA_FOV_SET?action.value:camera.fov,
        position: action.type===ActionTypes.CAMERA_POSITION_SET?action.value:camera.position,
        rotation: action.type===ActionTypes.CAMERA_ROTATION_SET?action.value:camera.rotation,
        radius:   action.type===ActionTypes.CAMERA_RADIUS_SET?action.value:camera.radius,
    };
}