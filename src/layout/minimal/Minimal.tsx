import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';

import Header from './components/Header/Header';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: 64,
        height: '100%'
    },
    content: {
        height: '100%'
    }
}));

const Minimal = (props: any) => {
    const {children} = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header/>
            <main className={classes.content}>{children}</main>
        </div>
    );
};

Minimal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default Minimal;
