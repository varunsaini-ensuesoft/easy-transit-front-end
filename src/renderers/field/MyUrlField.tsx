import React from 'react';
import { makeStyles } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});


const MyUrlField = ({ record = {}, source }:{record:any,source:string}) => {
   // const classes = useStyles();
    return (
        <a href={record[source]} /* className={classes.link}*/>
            {record[source]}
            <LaunchIcon /* className={classes.icon}*/ />
        </a>
    );
}


export default MyUrlField;