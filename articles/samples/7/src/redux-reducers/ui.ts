const defaultUi = {
    drawer:false,
    color: '#cccccc',
};


export default function ui(ui=defaultUi, action) {
    return {
        drawer: action.type==='UI_DRAWER_TOGGLE'?(!ui.drawer):ui.drawer,
        color:  action.type==='UI_COLOR_SET'?action.value:ui.color,
    };
}