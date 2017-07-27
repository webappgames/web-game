import * as BABYLON from 'babylonjs';

let materials = {};
export function createMaterial(color:string,scene:BABYLON.Scene):BABYLON.StandardMaterial{

    let material:BABYLON.StandardMaterial;
    if(typeof materials[color]==='undefined'){

        material= new BABYLON.StandardMaterial(color, scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(color);

        materials[color]=material;
    }else{
        material=materials[color];
    }

    return material;
}