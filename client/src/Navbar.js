import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        backgroundColor : '#fff'
    },
    logo:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <div className={classes.logo}>
                    <Image
                        src="/logo.png"
                        width={165}
                        height={69}
                    />
                </div>
            </Toolbar>
        </AppBar>
        </div>
    );
}
/*
<Typography variant="h6" noWrap>
                    IDEMY
                </Typography>
                
*/
export default Navbar;