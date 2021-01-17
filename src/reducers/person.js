import {
    SELECT_PERSON
} from '../constants/actions';

const initalState ={};

export default (state = initalState, action)=>{
    const newState = action.data

    switch (action.type){
        case SELECT_PERSON:
            return newState;
        default:
            return state;
    }
}
