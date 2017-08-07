import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import Root from "../root";
import {stateReducer} from '../../redux-reducers/index';

const store = createStore(stateReducer, {});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <Root/>
            </MuiThemeProvider>
        </Provider>
        , div);
});