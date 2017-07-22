import {Vector3} from '../classes/vector3';

enum CameraTypes{
    SPECTATOR,
    FPS,
}

const defaultCamera = {
    type: CameraTypes.SPECTATOR,
    fov: 1.3,
    rotation: {
        x: 0,
        y: 0,
        z: 0
    },
    radius: 10
};

enum ActionTypes{
    CAMERA_TYPE_SET,
    CAMERA_FOV_SET,
    CAMERA_ROTATION_SET,
    CAMERA_RADIUS_SET,
}

export const createAction = {
    CAMERA_TYPE_SET: (value:CameraTypes)=>({type:ActionTypes.CAMERA_TYPE_SET,value}),
    CAMERA_FOV_SET: (value:number)=>({type:ActionTypes.CAMERA_FOV_SET,value}),
    CAMERA_ROTATION_SET: (value:Vector3)=>({type:ActionTypes.CAMERA_ROTATION_SET,value}),
    CAMERA_RADIUS_SET: (value:number)=>({type:ActionTypes.CAMERA_RADIUS_SET,value}),
};


export function camera(camera = defaultCamera, action) {
    return {
        type:     action===ActionTypes.CAMERA_TYPE_SET?action.value:camera.type,
        fov:      action===ActionTypes.CAMERA_FOV_SET?action.value:camera.fov,
        rotation: action===ActionTypes.CAMERA_ROTATION_SET?action.value:camera.rotation,
        radius:   action===ActionTypes.CAMERA_RADIUS_SET?action.value:camera.radius,
    };
}