import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    display: "flex",
  },
  list: {
    width: 300,
    alignItems: "flex-start",
  },
  fullList: {
    //width: 'auto',
  },
  listHeaderSize: {
    fontSize: "1.8em",
  },
  listItemSize: {
    fontSize: "1.4em",
  },
}));

const MenuComponent = (props) => {
  const router = useRouter();

  const home = () => {
    router.push("/home");
  };

  const mycourses = () => {
      router.push("/mycourses");
  }

  const goWishlist = () => {
    router.push("/wishlist");
  };

  const goSettings = () => {
    router.push("/settings");
  };

  const logout = () => {
    router.push("/");
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listHeaderSize }}
            primary="Oğulcan Pirim"
          />
        </ListItem>
        <Divider />
        <ListItem button key="home" onClick={home}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemSize }}
            primary="Home"
          />
        </ListItem>
        <ListItem button key="mycourses" onClick={mycourses}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemSize}}
            primary="My Courses"
          />
        </ListItem>
        <ListItem button key="wishlist" onClick={goWishlist}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemSize }}
            primary="My Wishlist"
          />
        </ListItem>
        <ListItem button key="settings" onClick={goSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemSize }}
            primary="Account Settings"
          />
        </ListItem>
        <ListItem button key="logout" onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemSize }}
            primary="Log Out"
          />
        </ListItem>
      </List>
    </div>
  );

  /*menu side*/
  const anchor = "left";

  return (
    <div>
      <div className={classes.menuIcon}>
        <IconButton size="medium" onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
};
export default MenuComponent;
