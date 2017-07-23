import * as React from "react";
import {connect} from 'react-redux';
import {createAction,CameraModes} from '../redux-reducers/camera';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import * as FontAwesome from 'react-fontawesome';

function mapStateToProps(state){
    return state.camera
};

function mapDispatchToProps(dispatch){
    return {
        setCameraMode: (cameraMode:CameraModes)=>dispatch(createAction.CAMERA_MODE_SET(cameraMode)),
        setFov: (fov:number)=>dispatch(createAction.CAMERA_FOV_SET(fov)),
    }
};



export function Camera({mode,fov,setCameraMode,setFov}) {
    return (
        <div>
            <Subheader>Player mode</Subheader>

            {/*<MenuItem>
                <SelectField
                    value={mode}
                    onChange={setCameraMode}
                >

                    <MenuItem
                        value={CameraModes.ROTATE}
                        leftIcon={<FontAwesome name="cube"/>}>
                        Rotate
                    </MenuItem>
                    <MenuItem
                        value={CameraModes.MOVE}
                        leftIcon={<FontAwesome name="cube"/>}>
                        Move
                    </MenuItem>

                </SelectField>
            </MenuItem>*/}

            <MenuItem
                onTouchTap={() => setCameraMode(CameraModes.ROTATE)}
                style={{backgroundColor: CameraModes.ROTATE === mode ? '#ddd' : 'white'}}
                leftIcon={<FontAwesome name="cube"/>}>
                Rotate
            </MenuItem>
            <MenuItem
                onTouchTap={() => setCameraMode(CameraModes.MOVE)}
                style={{backgroundColor: CameraModes.MOVE === mode ? '#ddd' : 'white'}}
                leftIcon={<FontAwesome name="cube"/>}>
                Move
            </MenuItem>
            <MenuItem
                onTouchTap={() => setCameraMode(CameraModes.FPS)}
                style={{backgroundColor: CameraModes.FPS === mode ? '#ddd' : 'white'}}
                leftIcon={<FontAwesome name="cube"/>}>
                Fps
            </MenuItem>

            <Subheader>Camera FOV</Subheader>

            <MenuItem>
                <Slider
                    min={0.2}
                    max={2}
                    step={0.001}
                    value={fov}
                    onChange={setFov}
                />
            </MenuItem>

        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Camera);
