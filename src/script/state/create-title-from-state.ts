import {WEB_NAME,TITLE_SEPARATOR} from '../config.ts';

export default function createTitleFromState(state):string {
    let titleParts = [];

    if (state.blocks.length> 1) {
        titleParts.push(state.blocks.length + ' blocks world');
    }
    titleParts.push(WEB_NAME);

    return titleParts.join(TITLE_SEPARATOR);
}