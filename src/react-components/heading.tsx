import * as React from "react";
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
    return {
        blocksSize:state.blocks.length
    }
};


let Heading = ({ blocksSize }) => {
    return (
        <div>
            <h1>{blocksSize} blocks world</h1>
        </div>
    )
};



Heading = connect(mapStateToProps)(Heading);

export {Heading}