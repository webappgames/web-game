import * as React from "react";
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
    return {
        palette:state.palette
    }
};


let Palette = ({ palette }) => {
    return (
        <ul>
            {
                palette.options.map((option)=><li style={{backgroundColor:option}}>{option}</li>)
            }
        </ul>
    )
};


Palette = connect(mapStateToProps)(Palette);

export default Palette