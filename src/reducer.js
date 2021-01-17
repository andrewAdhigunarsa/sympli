import { combineReducers } from 'redux';
import peopleData from "./reducers/people";
import personData from "./reducers/person";

export default combineReducers({
    peopleData,
    personData
})
