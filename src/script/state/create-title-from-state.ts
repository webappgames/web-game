import * as Immutable from "immutable";
import {WEB_NAME,TITLE_SEPARATOR} from '../config.ts';

export default function createTitleFromState(state:Immutable.Map<string,any>):string {
    let titleParts = [];

    if (state.get('blocks').size > 1) {
        titleParts.push(state.get('blocks').size + ' blocks world');
    }
    titleParts.push(WEB_NAME);

    return titleParts.join(TITLE_SEPARATOR);
}