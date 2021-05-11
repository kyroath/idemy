import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, handleDrawerOpen, Button } from '@material-ui/core';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    menuIcon: {
        display: 'flex',
    },
    list: {
        width: 300,
        alignItems: "flex-start",
        
    },
    fullList: {
        //width: 'auto',
    },
    listHeaderSize:{
        fontSize:'1.8em',
    },
    listItemSize:{
        fontSize:'1.4em',
    }
}));

const MenuComponent = (props) => {

    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText classes = {{primary:classes.listHeaderSize}} primary = "Oğulcan Pirim"/>
                </ListItem>
                <Divider/>
                <ListItem button key="mycourses">
                    <ListItemIcon><AllInboxIcon /></ListItemIcon>
                    <ListItemText classes = {{primary:classes.listItemSize}} primary = "My Courses"/>
                </ListItem>
                <ListItem button key="wishlist">
                    <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
                    <ListItemText classes = {{primary:classes.listItemSize}} primary = "My Wishlist"/>
                </ListItem>
                <ListItem button key="notes">
                    <ListItemIcon><SpeakerNotesIcon /></ListItemIcon>
                    <ListItemText classes = {{primary:classes.listItemSize}} primary = "My Notes"/>
                </ListItem>
                <ListItem button key="signout">
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText classes = {{primary:classes.listItemSize}} primary = "Sign Out"/>
                </ListItem>
            </List>
        </div>
    );

    /*menu side*/
    const anchor = 'left';

    return (
        <div>
            <div className={classes.menuIcon}>
                <IconButton size="medium" onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                </IconButton>
            </div>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
            </Drawer>
        </div>
    )
};
export default MenuComponent;