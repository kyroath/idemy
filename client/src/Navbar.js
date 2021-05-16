import { AppBar, Toolbar,makeStyles, Typography, IconButton} from '@material-ui/core';
import React from 'react';
import Image from 'next/image';
import MenuComponent from '../src/components/MenuComponent';
import SearchComponent from '../src/components/SearchComponent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useRouter } from "next/router";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        backgroundColor : '#fff',
    },
    
    logo:{
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
    },
    text:{
        marginLeft: '1.2em'
    },
}));

const Navbar = (props) => {
    
    const classes = useStyles();
    const router = useRouter();

    const goWishlist = () => {
        router.push("/wishlist");
    }

    const goBag = () => {
        router.push("/bag");
    }
    
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                {(props.showMenu === "true") ? <MenuComponent></MenuComponent> : <></>}
                <Typography variant = "h6" color = "textPrimary" className = {classes.text}>{props.text}</Typography>
                <div className={classes.logo}>
                    <Image
                        src="/logo.png"
                        width={165}
                        height={69}
                    />
                </div>
                {(props.showMenu === "true") ? <IconButton onClick={goWishlist}><FavoriteIcon/></IconButton> : <></>}
                {(props.showMenu === "true") ? <IconButton onClick={goBag}><ShoppingCartIcon/></IconButton> : <></>}
                {(props.showSearch === "true") ? <SearchComponent></SearchComponent> : <></>}
            </Toolbar>
        </AppBar>
        </div>
    );
}
export default Navbar;