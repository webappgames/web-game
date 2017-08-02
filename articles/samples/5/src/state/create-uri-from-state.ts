function createUriFromState(state){
    var key = saveState(state);
    return `#${key}`;
}