import { combineReducers } from 'redux'
import blocks from './blocks'
//import palette from './palette'
import {ui} from './ui'


export default combineReducers({
    blocks,
    //palette,
    ui
})