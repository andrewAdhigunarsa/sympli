import React from 'react';
import {makeStyles} from '@material-ui/core'
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    container: {
        width:'80%',
        backgroundColor:'#fff',
        borderRadius:'4px',
        color:'#000',
        padding:'16px',
        textAlign:'left',
        boxSizing:'border-box'
    },

    text:{
        textAlign: 'left',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '400',
        lineHeight: '1.43',
        margin:'0 0 10px 10',
        fontSize:'14px'

    }
});

function DetailsSection(props) {
    const classes = useStyles(props);
    const person = useSelector(state=> state.personData);

    return (
        <section className={classes.container}>
            <p className={classes.text}><strong>Details section</strong></p>
            <p className={classes.text}>name: {person.name}</p>
            <p className={classes.text}>Birth year: {person.birth_year}</p>
            <p className={classes.text}>Gender: {person.gender}</p>
        </section>
    );
}

export default DetailsSection;
