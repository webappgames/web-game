const defaultEnvironment = {
    groundColor: '#74ffaa',
    skyColor: '#c0faff',
};

enum ActionTypes{
    ENVIRONMENT_GROUND_COLOR_SET='ENVIRONMENT_GROUND_COLOR_SET',
    ENVIRONMENT_SKY_COLOR_SET='ENVIRONMENT_SKY_COLOR_SET',
}

export const createAction = {
    ENVIRONMENT_GROUND_COLOR_SET: (value:string)=>({type:ActionTypes.ENVIRONMENT_GROUND_COLOR_SET,value}),
    ENVIRONMENT_SKY_COLOR_SET: (value:string)=>({type:ActionTypes.ENVIRONMENT_SKY_COLOR_SET,value}),
};

export function environment(environment = defaultEnvironment, action) {
    return {
        groundColor: action.type===ActionTypes.ENVIRONMENT_GROUND_COLOR_SET?action.value:environment.groundColor,
        skyColor: action.type===ActionTypes.ENVIRONMENT_SKY_COLOR_SET?action.value:environment.skyColor,
    }
}