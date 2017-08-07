import * as BABYLON from 'babylonjs';

export default function updateScene(scene:BABYLON.Scene, state):void {
    scene.meshes.forEach((mesh) => {
        mesh.dispose();
    });
    scene.meshes = [];

    state.blocks.forEach(block=> {
        const newBox = BABYLON.Mesh.CreateBox(block.id, 1, scene);
        newBox.position = new BABYLON.Vector3(block.position.x, block.position.y, block.position.z);

        const material = new BABYLON.StandardMaterial(block.color, scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(block.color);
        newBox.material = material;
    });
}