import * as BABYLON from 'babylonjs';

let materialsCache = {};
export function createMaterial(color:string,scene:BABYLON.Scene):BABYLON.StandardMaterial{

    let material:BABYLON.StandardMaterial;
    if(typeof materialsCache[color]==='undefined'){

        material= new BABYLON.StandardMaterial(color, scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(color);

        materialsCache[color]=material;
    }else{
        material=materialsCache[color];
    }

    return material;
}