import * as React from 'react';
import { connect } from 'react-redux';
import UiColor from './ui';
import Environment from './environment';
import Camera from './camera';
import { createAction } from '../redux-reducers/ui';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import * as FontAwesome from 'react-fontawesome';

function mapStateToProps(state) {
    return state.ui;
}

function mapDispatchToProps(dispatch) {
    return {
        onMenu: () => dispatch(createAction.UI_DRAWER_TOGGLE()),
    };
}

function Root({ drawer, onMenu }) {
    return (
        <div>
            <RaisedButton
                onTouchTap={onMenu}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                }}
            >
                <FontAwesome name="bars" />
            </RaisedButton>

            <Drawer
                style={{
                    zIndex: 5,
                }}
                open={drawer}
            >
                <MenuItem onTouchTap={onMenu} leftIcon={<FontAwesome name="times" />}>
                    Close
                </MenuItem>

                <Camera />
                <Divider />
                <UiColor />
                <Environment />
            </Drawer>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);
