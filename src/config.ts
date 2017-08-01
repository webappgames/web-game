import * as BABYLON from 'babylonjs';
import {Vector3} from './classes/vector3';
import {Block} from './classes/block';

export const WEB_NAME = 'Simple web game';
export const TITLE_SEPARATOR = ' | ';

export const DEFAULT_CAMERA_FOV = 1.3;
export const DEFAULT_CAMERA_RADIUS = 10;
export const DEFAULT_CAMERA_ROTATION_ALPHA = Math.PI / 4;
export const DEFAULT_CAMERA_ROTATION_BETA = Math.PI / 4;
export const DEFAULT_CAMERA_TARGET = new Vector3(0,0,0);

export const DEBOUNCE_SLIDER = 500;
export const DEBOUNCE_STATE_TO_URI = 700;


export const BLOCKS_DEFAULT = [
    new Block(undefined,new Vector3(0,0,0),'#cccccc')
];

export function configCamera(camera:BABYLON.ArcRotateCamera){
    camera.panningAxis = new BABYLON.Vector3(1,0,1);
    camera.panningSensibility = 150;
    camera.upperBetaLimit = (Math.PI/2)*(9/10);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 100;
}

export const COLOR_HOVER = '#2eff29';
export const COLOR_GROUND = '#74ffaa'
export const COLOR_SKY = '#c0faff';

export const PALETTE_COMMON = [
    '#ffffff',
    '#000000',
    '#74ffaa',
    '#ffb075',
];

export const PALETTE_GROUND = [
    COLOR_GROUND,
    '#3dff55',
    '#ccff7c',
];
export const PALETTE_SKY = [
    COLOR_SKY,
    '#55fff0',
    '#eafeff',
];