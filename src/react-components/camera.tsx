import * as React from "react";
import {connect} from 'react-redux';
import {createAction,CameraModes} from '../redux-reducers/camera';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import * as FontAwesome from 'react-fontawesome';

function mapStateToProps(state){
    return state.camera
};

function mapDispatchToProps(dispatch){
    return {
        setCameraMode: (cameraMode:CameraModes)=>dispatch(createAction.CAMERA_MODE_SET(cameraMode)),
    }
};



export function Camera({mode,setCameraMode}) {
    return (
        <div>
            <Subheader>Player mode</Subheader>
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
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Camera);
