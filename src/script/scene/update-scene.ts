import * as Immutable from "immutable";
import * as BABYLON from 'babylonjs';

export default function updateScene(scene:BABYLON.Scene, state: Immutable.Map<string,any>):void {
    scene.meshes.forEach((mesh) => {
        mesh.dispose();
    });
    scene.meshes = [];

    const materialNormal = scene.materials.find(material=>material.name==='material-normal');

    state.get('blocks').toJS().forEach(block=> {
        const newBox = BABYLON.Mesh.CreateBox(block.id, 1, scene);
        newBox.material = materialNormal;
        newBox.position = new BABYLON.Vector3(block.position.x, block.position.y, block.position.z);
    });
}