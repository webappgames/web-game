import * as React from "react";
import {connect} from 'react-redux';
import {createAction} from '../redux-reducers/ui';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ColorPicker from './color-picker';
import * as FontAwesome from 'react-fontawesome';



function mapStateToProps(state){
    return state.ui;
};

function mapDispatchToProps(dispatch){
    return {
        setColor: (color)=>dispatch(createAction.UI_COLOR_SET(color)),
    }
};


const PALETTE_BLOCK=[
    '#ffa58a',
    '#ffdc43',
    '#777777',
    '#ffffff',
];


export function UiColor({color,setColor}) {
    return (
        <div>
            <Subheader>Block color</Subheader>


            <MenuItem>
                <ColorPicker value={color} onChange={setColor} palette={PALETTE_BLOCK}/>
            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(UiColor);
