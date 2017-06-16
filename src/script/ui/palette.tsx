import * as React from "react";
import { connect } from 'react-redux'
import {createActionPaletteOptionAdd,createActionPaletteOptionDelete,createActionPaletteOptionSelect} from '../state-reducers/palette';


const mapStateToProps = (state) => {
    return {
        palette:state.palette
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOptionClick:(index)=>dispatch(createActionPaletteOptionSelect(index));
    }
};


let Palette = ({ palette,onOptionClick }) => {
    return (
        <ul>
            {
                palette.options.map((option,index)=><li
                    key={index}
                    style={{backgroundColor:option}}
                    className={palette.current===index?'selected':undefined}
                    onClick={()=>onOptionClick(index)}

                >{option}</li>)
            }
        </ul>
    )
};


Palette = connect(mapStateToProps,mapDispatchToProps)(Palette);

export default Palette