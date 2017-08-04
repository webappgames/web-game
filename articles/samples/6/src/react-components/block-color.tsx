import * as React from "react";
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state){
    return {
        color: state.ui.color
    };
};

function mapDispatchToProps(dispatch){
    return {
        colorChange: (event)=>dispatch({type:'UI_COLOR_SET',value:event.target.value}),
    }
};

function BlockColor({color,colorChange}){
    return (
        <div>
            <Subheader>Block color</Subheader>
            <MenuItem>
                <input type="color" value={color} onChange={colorChange}/>
            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(BlockColor);
