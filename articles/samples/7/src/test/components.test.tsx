import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {stateReducer} from '../redux-reducers/index';
import Root from "../react-components/root";
import Heading from "../react-components/heading";
import BlockColor from "../react-components/block-color";
injectTapEventPlugin();

const store = createStore(stateReducer, {});

it('Root renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <Root/>
            </MuiThemeProvider>
        </Provider>
        , div);
});

it('Heading renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <Heading/>
            </MuiThemeProvider>
        </Provider>
        , div);
});

it('BlockColor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <BlockColor/>
            </MuiThemeProvider>
        </Provider>
        , div);
});