import * as React from "react";
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state){
    return {
        size: state.blocks.length
    };
};


function Heading({size}){
    return (
        <div>
            <MenuItem>
                <h2>{size} blocks world</h2>
            </MenuItem>
        </div>
    )
}


export default connect(mapStateToProps)(Heading);
