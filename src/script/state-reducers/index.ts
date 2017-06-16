import { combineReducers } from 'redux'
import blocks from './blocks.ts'
import palette from './palette.ts'


export default combineReducers({
    blocks,
    palette
})