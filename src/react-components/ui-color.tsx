import * as React from "react";
import {connect} from 'react-redux';
import {createAction} from '../redux-reducers/ui';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import * as FontAwesome from 'react-fontawesome';

//todo to config
const interestingColors = [
    '#ffffff',
    '#000000',
    '#74ffaa',
    '#ffb075',
];

function mapStateToProps(state){

    let colors = [].concat(interestingColors);

    for(let block of state.blocks){
        colors.push(block.color);
    }

    colors.push(state.ui.color);

    //todo unique

    return {
        color: state.ui.color,
        colors
    }
};

function mapDispatchToProps(dispatch){
    return {
        setColor: (color)=>dispatch(createAction.UI_COLOR_SET(color)),
    }
};



export function UiColor({color,colors,setColor}) {
    return (
        <div>
            <Subheader>Block color</Subheader>


            <MenuItem>
                {colors.map((currentColor) => (

                    <Paper
                        key={currentColor}
                        onTouchTap={() => setColor(currentColor)}
                        style={{
                            display: 'inline-block',
                            width: 20,
                            height: 20,
                            border: color===currentColor?'2px solid black':'none',
                            backgroundColor: currentColor,
                        }}

                        rounded={false}>
                    </Paper>
                ))}

                <input type="color" value={color} onChange={(event) => setColor(event.target.value)}/>

            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(UiColor);
