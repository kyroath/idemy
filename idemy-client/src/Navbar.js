import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        backgroundColor : '#fff'
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap color="secondary">
                    IDEMY
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Navbar;