import * as React from "react";
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';


//todo to config
const interestingColors = [
    '#ffffff',
    '#000000',
    '#74ffaa',
    '#ffb075',
];

function mapStateToProps(state){

    let palette = [].concat(interestingColors);

    for(let block of state.blocks){
        palette.push(block.color);
    }

    palette.push(state.ui.color);
    palette.push(state.environment.groundColor);

    return {
        paletteGlobal:palette
    }
};


function ColorPicker({value,paletteGlobal,palette,onChange}) {

    const paletteLocal = palette;
    palette = [].concat(paletteLocal,paletteGlobal);

    palette = palette.filter((v, i, a) => a.indexOf(v) === i);



    return (
        <div>


            {palette.map((currentColor) => (

                <Paper
                    key={currentColor}
                    onTouchTap={() => onChange(currentColor)}
                    style={{
                        display: 'inline-block',
                        width: 20,
                        height: 20,
                        border: value===currentColor?'2px solid black':'none',
                        backgroundColor: currentColor,
                    }}

                    rounded={false}>
                </Paper>
            ))}

            <input type="color" value={value} onChange={(event) => onChange(event.target.value)}/>

        </div>
    );

}



export default connect(mapStateToProps)(ColorPicker);
