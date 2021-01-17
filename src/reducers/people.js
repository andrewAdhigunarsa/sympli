import {
    FETCH_PEOPLE,
    UPDATE_CURRENT_PAGE
} from '../constants/actions';

const initalState ={
    currentPage: 1,
    count: 0,
    pages: [],
};

export default (state = initalState, action)=>{
    const newState = {
        currentPage: state.currentPage,
        count: state.count,
        pages: [...state.pages],
    }

    switch (action.type){
        case FETCH_PEOPLE:
            return {
                currentPage: action.currentPage,
                count: action.payload.count,
                pages: [...newState.pages, ...action.payload.pages],
            };

        case UPDATE_CURRENT_PAGE:
            return {
                currentPage: action.currentPage,
                count: state.count,
                pages: state.pages
            };
        default:
            return state;
    }
}
