import React from 'react'
import { connect } from 'react-redux'


let Heading = ({ blocksSize }) => {
    let input

    return (
        <div>
            <h1>{blockSize} blocks world</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blocksSize:state.get('blocks').size
    }
}


Heading = connect(mapStateToProps)(Heading)

export default Heading