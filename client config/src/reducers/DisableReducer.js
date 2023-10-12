const init = {
    disable:true,
    display:false,
}

const DisableReducer = (state = init,action) =>{
    switch(action.type){
        case 'SET_DISABLE_STATE':
            return {...state,disable:action.payload};
        case 'DISPLAY_PROFESSOR':
            return {...state,display:action.payload};
        default:
            return state;
    }
}

export default DisableReducer;