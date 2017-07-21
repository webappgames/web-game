import * as React from "react";
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';


const mapStateToProps = (state) => {
    return {
        blocksSize:state.blocks.length
    }
};


let Heading = ({ blocksSize }) => {
    return (
        <div>
            <h1>{blocksSize} blocks world</h1>
            <RaisedButton label="Default" />
        </div>
    )
};



Heading = connect(mapStateToProps)(Heading);

export {Heading}