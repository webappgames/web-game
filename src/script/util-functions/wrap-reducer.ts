export default function wrapReducer(reducer){

    if('groupCollapsed' in console){

        return function (oldState,action) {
            console.groupCollapsed(`==[${action.type}]==>`);
            console.log(oldState.toJS());
            console.log('||');
            console.log('||');


            console.log(`[${action.type}]`, action);
            const newState = reducer(oldState, action);

            console.log('||');
            console.log('||');
            console.log('\\/');
            console.log(newState.toJS());
            console.log('(Immutable)',newState);

            if (oldState.equals(newState)) {
                console.log('==>States are equal');
            }
            console.groupEnd();

            return newState;

        }

    }else{

        return reducer;
    }


}