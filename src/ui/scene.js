/*import * as React from "react";
import { connect } from 'react-redux'

import * as BABYLON from 'babylonjs';
import updateScene from './scene/update-scene';
import stateReducer from './state-reducers/index';
import createScene from './scene/create-scene';
import updateScene from './scene/update-scene';



const mapStateToProps = (state) => {
    return {
        blocks:state.blocks
    }
};

class Scene extends React.Component {
    render() {
        return  <div><canvas ref="scene"></canvas>aaaaa</div>;
    }

    componentDidMount(){

        console.log('Scene componentDidMount.');
        const canvas = this.refs.scene;
        const engine = new BABYLON.Engine(canvas, true);
        const scene = createScene(canvas, engine, ()=>store);
        engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener("resize", function () {
            engine.resize();
        });


        function render() {
            updateScene(scene, this.props.blocks);
        }

        render();

    }
}


Scene = connect(mapStateToProps)(Scene);

export default Scene*/