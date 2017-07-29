import * as React from "react";
import {connect} from 'react-redux';
import {createAction} from '../redux-reducers/environment';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ColorPicker from './color-picker';


function mapStateToProps(state){
    return state.environment;
};

function mapDispatchToProps(dispatch){
    return {
        setGroundColor: (color)=>dispatch(createAction.ENVIRONMENT_GROUND_COLOR_SET(color)),
        setSkyColor: (color)=>dispatch(createAction.ENVIRONMENT_SKY_COLOR_SET(color)),
    }
};


//todo config
const PALETTE_GROUND = [
    '#3dff55',
    '#ccff7c',
];
const PALETTE_SKY = [
    '#55fff0',
    '#eafeff',
];


export function Environment({groundColor,skyColor,setGroundColor,setSkyColor}) {
    return (
        <div>
            <Subheader>Ground color</Subheader>
            <MenuItem>
                <ColorPicker value={groundColor} onChange={setGroundColor} palette={PALETTE_GROUND}/>
            </MenuItem>
            <Subheader>Sky color</Subheader>
            <MenuItem>
                <ColorPicker value={skyColor} onChange={setSkyColor} palette={PALETTE_SKY}/>
            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Environment);
