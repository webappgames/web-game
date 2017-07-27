import * as BABYLON from 'babylonjs';
import * as _ from "lodash";
import {Store, Action} from 'redux';
import {createAction} from '../redux-reducers/blocks';
import {createAction as createActionCamera, CameraModes, camera} from '../redux-reducers/camera';
import {Block} from '../classes/block';
import {Vector3} from '../classes/vector3';
import {createMaterial} from './create-material';


export default function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine, getStore: ()=>Store<Object>): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.2;
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = (Math.PI/2)*(9/10);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 100;


    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 3, 20);
    light.intensity = 0.5;
    const light2 = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 1 / 2), scene);
    light2.intensity = 0.5;

    const materialHover = createMaterial('#2eff29',scene);

    const groundMesh = BABYLON.Mesh.CreateGround("ground", 10000, 10000, 2, scene);
    groundMesh.position.y = -0.5;
    groundMesh.receiveShadows = true;

    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    //shadowGenerator.useExponentialShadowMap = true;
    //shadowGenerator.usePoissonSampling = true;


    //todo throttle, listen to rotation changes
    let lastRotation:Vector3;
    scene.registerBeforeRender(_.debounce(()=>{

        console.log(scene.activeCamera);

        /*const thisRotation = new Vector3(
            scene.activeCamera.alpha,
            scene.activeCamera.beta,
            scene.activeCamera.gamma,
        );
        if(thisRotation!==lastRotation){
            getStore().dispatch(createActionCamera.CAMERA_ROTATION_SET(thisRotation));
            lastRotation = this.rotation;
        }/**/
    },500));


    let pointerDown:boolean;
    let pointUnderPointer:Vector3 = null;
    function onPointerDown(event){
        pointerDown = true;
        pointUnderPointer = new Vector3(event.clientX,event.clientY,0);
    }


    function onPointerUp(event) {
        pointerDown = false;
        if(Vector3.distance(pointUnderPointer,new Vector3(event.clientX,event.clientY,0))>20)return;

        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            switch (event.button) {
                case 0:
                    let position:Vector3;


                    if(currentMesh.name==='ground'){
                        position = new Vector3(
                            Math.round(pickInfo.pickedPoint.x),
                            0,
                            Math.round(pickInfo.pickedPoint.z)
                        );
                    }else{
                        const diff = currentMesh.position.subtract(pickInfo.pickedPoint);
                        position = currentMesh.position.clone();

                        ['x', 'y', 'z'].forEach((dimension) => {
                            if (diff[dimension] >= 0.5 - 0.001) {
                                position[dimension]--;
                            } else if (diff[dimension] <= -0.5 + 0.001) {
                                position[dimension]++;
                            }
                        });
                    }

                    console.log(position);

                    getStore().dispatch(
                        createAction.BLOCK_ADD(
                            new Block(undefined,position,(getStore().getState() as any).ui.color)
                        )
                    );

                    break;

                case 2:
                    if(currentMesh.name==='ground')return;
                    getStore().dispatch(createAction.BLOCK_DELETE(currentMesh.name));
                    break;
            }
        }
    }

    function onContextMenu(event) {
        event.preventDefault()
    }

    let lastMesh = null;
    let lastMaterial:BABYLON.Material;

    function onPointerMove(event) {

        if(pointerDown){
            onPointerDrag(event);
            return;
        }

        if (lastMesh) {
            lastMesh.material = lastMaterial;
        }
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            if(currentMesh.name==='ground')return;
            lastMaterial = currentMesh.material;
            currentMesh.material = materialHover;
            lastMesh = currentMesh;
        } else {
            lastMesh = null;
        }

    }


    function onPointerDrag(event){
        if((getStore().getState() as any).camera.mode === CameraModes.MOVE){

            camera.target.x+=0.01;

        }

    }


    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("contextmenu", onContextMenu, false);
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("contextmenu", onContextMenu);
        canvas.removeEventListener("pointermove", onPointerMove);
    };
    return scene;
}