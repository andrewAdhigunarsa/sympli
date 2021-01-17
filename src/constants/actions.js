import axios from "axios";

export const FETCH_PEOPLE = 'FETCH_PEOPLE';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const SELECT_PERSON = 'SELECT_PERSON';

const peopleBaseURL = "http://swapi.dev/api/people/";

export function fetchPeople(page=1){
    const request = axios.get(`${peopleBaseURL}?page=${parseInt(page)}`);

    return (dispatch)=>{
        request.then(({data})=>{

            if(data && data.results && data.results !== [] && data.results !== null){
                const people = data.results.map(person=>{
                    const id = person.url.replace('http://swapi.dev/api/people/','');
                    const trimmedId = id.replace('/','');

                    return {
                        id:trimmedId,
                        ...person
                    }
                })

                const pages = [{
                    page: page,
                    people
                }]

                const editedData = {
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                    pages
                }

                dispatch({
                    type:FETCH_PEOPLE,
                    currentPage:page,
                    payload:editedData,
                })
            }
        })
    }
}

export function updateCurrentPage(page){
    return (dispatch) => {
        dispatch({
            type:UPDATE_CURRENT_PAGE,
            currentPage:page
        })
    }
}

export function selectPerson(data){
    return (dispatch) => {
        dispatch({
            type:SELECT_PERSON,
            data
        })
    }
}
