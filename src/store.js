import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from "./reducer";
import thunk from 'redux-thunk';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(thunk)
    }else {
        return applyMiddleware(thunk)
    }
};

export const store = createStore(
    reducer,composeWithDevTools(getMiddleware())
)
