import * as React from "react";
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
    createActionPaletteOptionAdd,
    createActionPaletteOptionDelete,
    createActionPaletteOptionSelect
} from '../redux-reducers/palette';
//import '../style/palette.scss';


const mapStateToProps = (state) => {
    return {
        palette: state.palette
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOptionSelect: (index)=>dispatch(createActionPaletteOptionSelect(index)),
        onOptionDelete: (index)=>dispatch(createActionPaletteOptionDelete(index)),
        onOptionCreate: (color)=>dispatch(createActionPaletteOptionAdd(color))
    }
};

let color = '#ff0000';
let Palette = ({palette, onOptionSelect,onOptionDelete,onOptionCreate}) => {


    //console.log(arguments);
    //console.log({palette, onOptionSelect,onOptionDelete,onOptionCreate});


    return (
        <ul className="palette">
            {
                palette.options.map((option, index)=><li
                        key={index}
                        style={{backgroundColor: option}}
                        className={palette.current === index ? 'selected' : undefined}
                        onClick={()=>onOptionSelect(index)}

                    >
                        {option}

                        <div className="options">
                            <div className="arrow"></div>

                            <button onClick={()=>onOptionSelect(index)}><FontAwesome name="check"/>Select</button>
                            <button onClick={()=>onOptionDelete(index)}><FontAwesome name="trash"/>Delete</button>
                        </div>

                    </li>
                )}

            {/*<li className="plus">

                <FontAwesome name="plus"/>
                <div className="options">
                    <div className="arrow"></div>
                    <input type="color" value={color} onChange={(event)=>color = event.target.color}/>
                    <button onClick={()=>onOptionCreate(color)}><FontAwesome name="color"/>Add</button>
                </div>
            </li>*/}
        </ul>
    )
};


Palette = connect(mapStateToProps, mapDispatchToProps)(Palette);

export {Palette}