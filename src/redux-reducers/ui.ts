/*export enum MouseMode{
    ROTATING,
    MOVING,
}*/

const defaultUi = {
    drawer:false,
    //mouseMode: MouseMode.ROTATING,
    color: '#cccccc',
};

enum ActionTypes{
    UI_DRAWER_TOGGLE='UI_DRAWER_TOGGLE',
    //UI_MOUSEMODE_SET='UI_MOUSEMODE_SET',
    UI_COLOR_SET='UI_COLOR_SET',
}

export const createAction = {
    UI_DRAWER_TOGGLE: ()=>({type:ActionTypes.UI_DRAWER_TOGGLE}),
    //UI_MOUSEMODE_SET: (value:MouseMode)=>({type:ActionTypes.UI_MOUSEMODE_SET,value}),
    UI_COLOR_SET: (value:string)=>({type:ActionTypes.UI_COLOR_SET,value}),
};

export function ui(ui=defaultUi, action) {
    return {
        drawer: action.type===ActionTypes.UI_DRAWER_TOGGLE?(!ui.drawer):ui.drawer,
        //mouseMode:  action.type===ActionTypes.UI_MOUSEMODE_SET?action.value:ui.mouseMode,
        color:  action.type===ActionTypes.UI_COLOR_SET?action.value:ui.color,
    };
}