import * as React from "react";
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import * as FontAwesome from 'react-fontawesome';
import BlockColor from './block-color';
import Heading from './heading';


function mapStateToProps(state){
    return {
        drawer: state.ui.drawer
    };
}

function mapDispatchToProps(dispatch){
    return {
        onMenu: ()=>dispatch({type:'UI_DRAWER_TOGGLE'}),
    }
}

function Root({drawer,onMenu}){
    return (
        <div>
            <RaisedButton
                onTouchTap={onMenu}
                style={{
                    position: 'fixed',
                    zIndex: 3,
                    top: 0,
                    left: 0,
                }}>
                <FontAwesome name="bars"/>
            </RaisedButton>


            <Drawer style={{
                zIndex: 5
            }} open={drawer}>


                <MenuItem onTouchTap={onMenu} leftIcon={<FontAwesome name="times"/>}>Close</MenuItem>

                <Heading/>
                <Divider />
                <BlockColor/>


            </Drawer>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);