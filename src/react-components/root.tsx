import * as React from "react";
import {connect} from 'react-redux';
import {Heading} from './heading';
import {Palette} from './palette';
import {createActionUIDrawerToggle} from '../redux-reducers/ui';


import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import * as FontAwesome from 'react-fontawesome';



function mapStateToProps(state){
    return {
        drawer: state.ui.drawer
    }
};

function mapDispatchToProps(dispatch){
    return {
        onMenu: ()=>dispatch(createActionUIDrawerToggle()),
    }
};



export function Root({drawer,onMenu}){
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

                <Subheader>Library</Subheader>

                <MenuItem style={{backgroundColor: '#ddd'}}
                          leftIcon={<FontAwesome name="cube" style={{'color': 'red'}}/>}>Menu Item</MenuItem>

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
