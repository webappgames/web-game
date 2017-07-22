const defaultUi = {
    drawer:false,
    color: '#cccccc',
}

enum ActionTypes{
    UI_DRAWER_TOGGLE,
    UI_COLOR_SET,
}

export const createAction = {
    UI_DRAWER_TOGGLE: ()=>({type:ActionTypes.UI_DRAWER_TOGGLE}),
    UI_COLOR_SET: (value:string)=>({type:ActionTypes.UI_COLOR_SET,value}),
};

export function ui(ui=defaultUi, action) {
    return {
        drawer: action===ActionTypes.UI_DRAWER_TOGGLE?(!ui.drawer):ui.drawer,
        color:  action===ActionTypes.UI_COLOR_SET?action.value:ui.color,
    };
}