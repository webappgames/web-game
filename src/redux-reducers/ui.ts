export function createActionUIDrawerToggle(){
    return({type:'DRAWER_TOGGLE'});//todo const
}


export function ui(ui = {drawer:false}, action) {
    switch (action.type) {

        case 'DRAWER_TOGGLE':
            return {
                drawer: !ui.drawer
            };
        default:
            return ui;
    }
}