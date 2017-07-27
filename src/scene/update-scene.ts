import * as BABYLON from 'babylonjs';
import {createMaterial} from './create-material';

export default function updateScene(scene:BABYLON.Scene, state):void {


    //console.log(BABYLON.Color4.FromHexString(state.envirnment.skyColor));

    scene.activeCamera.fov = state.camera.fov;
    scene.clearColor = BABYLON.Color4.FromHexString(state.environment.skyColor+'ff');

    const shadowRenderList = [];
    scene.lights[0]._shadowGenerator.getShadowMap().renderList = shadowRenderList;

    let groundMesh:BABYLON.AbstractMesh;
    let newMeshes = [];
    scene.meshes.forEach((mesh) => {
        if(mesh.name!=='ground'){
            mesh.dispose();
        }else{
            newMeshes.push(mesh);
            groundMesh = mesh;
        }
    });
    scene.meshes = newMeshes;

    //const materialNormal = (scene.materials as any).find(material=>material.name==='material-normal');

    groundMesh.material = createMaterial(state.environment.groundColor,scene);


    (state as any).blocks.forEach(block=>{

        const newBox = BABYLON.Mesh.CreateBox(block.id, 1, scene);
        newBox.material = createMaterial(block.color,scene);
        newBox.position = new BABYLON.Vector3(block.position.x, block.position.y, block.position.z);
        shadowRenderList.push(newBox);
    });


}