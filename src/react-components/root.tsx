import * as React from "react";
import {connect} from 'react-redux';
import {Heading} from './heading';
//import {Palette} from './palette';
import {createAction} from '../redux-reducers/ui';


import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import * as FontAwesome from 'react-fontawesome';



function mapStateToProps(state){
    return state.ui
};

function mapDispatchToProps(dispatch){
    return {
        onMenu: ()=>dispatch(createAction.UI_DRAWER_TOGGLE()),
        setColor: (color)=>dispatch(createAction.UI_COLOR_SET(color)),
    }
};



export function Root({drawer,color,onMenu,setColor}){
    return (
        <div className="root">


            <RaisedButton
                onTouchTap={onMenu}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}>
                <FontAwesome name="bars"/>
            </RaisedButton>


            <Drawer style={{
                zIndex: 5
            }} open={drawer}>


                <MenuItem onTouchTap={onMenu} leftIcon={<FontAwesome name="times"/>}>Close</MenuItem>



                <Subheader>Block color</Subheader>

                {['#ff0000','#cccccc','#fcf081'].map((currentColor)=>(
                    <MenuItem
                        key={currentColor}
                        onTouchTap={()=>setColor(currentColor)}
                        style={{backgroundColor:currentColor===color?'#ddd':'none'}}
                        leftIcon={<FontAwesome name="cube" style={{'color':currentColor}}/>}>
                        {currentColor}
                    </MenuItem>

                ))}

                <Divider />
                <Subheader>Actions</Subheader>

            </Drawer>


            <nav className="top">
                <div className="left">

                </div>
                {/*<ul>
                 <li>Menu 1</li>
                 <li>Menu 2</li>
                 <li>Menu 3</li>
                 </ul>
                 <div className="right">

                 <button>Uložit</button>

                 </div>*/}
            </nav>


            <nav className="left">
                {/*<Palette/>*/}
            </nav>


            <footer>
                footer
            </footer>


        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);
