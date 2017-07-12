function loadState(key){
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return null;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
}
function saveState(state){
    const key = uuid.v4();
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key,serializedState);
    return key;
}