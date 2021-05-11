import { AppBar, Toolbar, Typography, makeStyles, handleDrawerOpen, Button} from '@material-ui/core';
import React from 'react';
import Image from 'next/image';
import MenuComponent from '../src/MenuComponent';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        //display: 'flex',
        //alignItems: 'left',
        //color: 'black',
        backgroundColor : '#fff',
    },
    
    logo:{
        margin: 'auto',
        display: 'flex',
    },
}));




const Navbar = (props) => {
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                {(props.showMenu === "true") ? <MenuComponent></MenuComponent> : <></>}
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