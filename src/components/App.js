import './App.css';
import PeopleTable from "./common/PeopleTable";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchPeople} from "../constants/actions";
import DetailsSection from "./common/DetailsSection";

function App() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPeople(1));
    },[])


  return (
    <div className="App">
        <div className="App-body">
            <PeopleTable/>
            <DetailsSection/>
        </div>
    </div>
  );
}

export default App;
