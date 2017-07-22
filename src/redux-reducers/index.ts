import { combineReducers } from 'redux'
import blocks from './blocks'
import {environment} from './environment'
import {camera} from './camera'
import {ui} from './ui'


export default combineReducers({
    blocks,
    environment,
    camera,
    ui
})