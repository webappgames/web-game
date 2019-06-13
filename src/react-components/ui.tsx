import * as React from 'react';
import { connect } from 'react-redux';
import { createAction, MouseModes } from '../redux-reducers/ui';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ColorPicker from './color-picker';
import * as FontAwesome from 'react-fontawesome';

function mapStateToProps(state) {
    return state.ui;
}

function mapDispatchToProps(dispatch) {
    return {
        setColor: (color) => dispatch(createAction.UI_COLOR_SET(color)),
        setMouseMode: (mouseMode) => dispatch(createAction.UI_MOUSEMODE_SET(mouseMode)),
    };
}

const PALETTE_BLOCK = ['#ffa58a', '#ffdc43', '#777777', '#ffffff'];

function UiColor({ color, mouseMode, setColor, setMouseMode }) {
    return (
        <div>
            <Subheader>Primary Button</Subheader>

            <MenuItem
                onTouchTap={() => setMouseMode(MouseModes.ADD)}
                style={{ backgroundColor: MouseModes.ADD === mouseMode ? '#ddd' : 'white' }}
                leftIcon={<FontAwesome name="plus-circle" />}
            >
                Add
            </MenuItem>
            <MenuItem
                onTouchTap={() => setMouseMode(MouseModes.DELETE)}
                style={{ backgroundColor: MouseModes.DELETE === mouseMode ? '#ddd' : 'white' }}
                leftIcon={<FontAwesome name="minus-circle" />}
            >
                Remove
            </MenuItem>

            <Subheader>Block color</Subheader>

            <MenuItem>
                <ColorPicker value={color} onChange={setColor} palette={PALETTE_BLOCK} />
            </MenuItem>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UiColor);
