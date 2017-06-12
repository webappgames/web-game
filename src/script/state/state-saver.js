function loadState(key){
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return null;
        }
        return Immutable.fromJS(JSON.parse(serializedState));
    } catch (err) {
        return null;
    }
}
function saveState(state){
        const key = uuid.v4();
        const serializedState = JSON.stringify(state.toJS());
        localStorage.setItem(key,serializedState);
        return key;
}