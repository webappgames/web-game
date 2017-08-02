const WEB_NAME = 'Simple web game';
const TITLE_SEPARATOR = ' | ';

function createTitleFromState(state) {
    let titleParts = [];

    if (state.blocks.length> 1) {
        titleParts.push(state.blocks.length + ' blocks world');
    }
    titleParts.push(WEB_NAME);

    return titleParts.join(TITLE_SEPARATOR);
}