import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector, useDispatch} from "react-redux";
import {fetchPeople, updateCurrentPage, selectPerson} from "../../constants/actions";

const useStyles = makeStyles({
    container: {
        width:'80%',
    },

    table: {
        minWidth: 350,
        cursor:'pointer'
    },

    dataGrid:{
        height:'auto'
    },

    buttonContainer:{
        float: 'right',
        marginBottom:'20px'
    }
});

const rowPerPage = 10;

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'height', headerName: 'Height', width: 100 },
    { field: 'mass', headerName: 'Mass', width: 100 },
];

function PeopleTable(props) {
    const classes = useStyles(props);
    const {count, currentPage, pages} = useSelector(state=>state.peopleData);
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(()=>{
        if(currentPage && pages && pages.length>0){
            const rws = processData(currentPage, pages)
            setRows(rws)
        }

        if(count !== null && count !== 0){
            const total = Math.ceil(count/rowPerPage);
            setTotalPages(total)
        }

    },[currentPage, pages, count])

    function getPerson(id, page, pagesData){


        if(id && page && pagesData && pagesData.length>0){
            const filtered = pagesData.filter(v=>v.page === page);
            const people = filtered[0].people;
            const person = people.filter(p=>p.id === id)
            dispatch(selectPerson(person[0]))
        }
    }

    function pageDataExist(page, pagesData){
        if(page && pagesData && pagesData.length>0){
            const filtered = pagesData.filter(v=>v.page === page);
            return filtered.length>0;
        }
        return false;
    }

    function processData(page, pagesData){
        if(page && pagesData && pagesData.length>0){
            const filtered = pagesData.filter(v=>v.page === page);
            const people = filtered[0].people;
            const rws = people.map(p=>{
                return{
                    id: p.id,
                    name: p.name,
                    height: p.height,
                    mass: p.mass
                }
            })
            return rws;
        }
        return {

        }

    }

    function handleChange(page){
        if(pageDataExist(page, pages) === true){
            dispatch(updateCurrentPage(page));
            const rws =  processData(page, pages)
            setRows(rws)
        }else {
            dispatch(fetchPeople(page));
        }
    }

    function goBack(currentPage){
        if(currentPage !== 1){
            const pageDestination = currentPage-1;
            handleChange(pageDestination);
        }
    }

    function goForward(currentPage){
        if(currentPage !== totalPages){
            const pageDestination = currentPage+1;
            handleChange(pageDestination);
        }
    }

    return (
        <section className={classes.container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(e=>{
                                return(
                                    <TableCell key={e.field}>{e.headerName}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length>0 && rows.map((row) => (
                            <TableRow key={row.id} onClick={()=>getPerson(row.id, currentPage , pages)}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.height}</TableCell>
                                <TableCell align="left">{row.mass}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.buttonContainer}>
                <button onClick={()=>goBack(currentPage)}>back</button>
                <button onClick={()=>goForward(currentPage)}>next</button>
            </div>
        </section>
    );
}

export default PeopleTable;
