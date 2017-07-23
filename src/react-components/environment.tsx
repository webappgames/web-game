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
        setColor: (color)=>dispatch(createAction.ENVIRONMENT_GROUND_COLOR_SET(color)),
    }
};



export function Environment({groundColor,setColor}) {
    return (
        <div>
            <Subheader>Ground color</Subheader>


            <MenuItem>
                <ColorPicker value={groundColor} onChange={setColor}/>
            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Environment);
