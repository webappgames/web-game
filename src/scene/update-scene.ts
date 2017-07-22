import * as BABYLON from 'babylonjs';

export default function updateScene(scene:BABYLON.Scene, state: Object):void {

    const shadowRenderList = [];
    scene.lights[0]._shadowGenerator.getShadowMap().renderList = shadowRenderList;

    let newMeshes = [];
    scene.meshes.forEach((mesh) => {
        if(mesh.name!=='ground'){
            mesh.dispose();
        }else{
            newMeshes.push(mesh);
        }
    });
    scene.meshes = newMeshes;

    const materialNormal = (scene.materials as any).find(material=>material.name==='material-normal');

    (state as any).blocks.forEach(block=>{
        const newBox = BABYLON.Mesh.CreateBox(block.id, 1, scene);
        newBox.material = materialNormal;
        newBox.position = new BABYLON.Vector3(block.position.x, block.position.y+0.5, block.position.z);
        shadowRenderList.push(newBox);
    });


}