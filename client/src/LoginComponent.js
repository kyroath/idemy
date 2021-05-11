import { Typography, TextField, Button, makeStyles} from "@material-ui/core"
import React from 'react';

const useStyles = makeStyles(theme => ({
    form: {
        width: '80%',
        marginTop: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(4, 0, 5),
    },
}));



const LoginComponent = (props) => {

    const classes = useStyles();
    
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign in to your Account
            </Typography>
            <form className={classes.form} autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.submit}
                    >SIGN IN
                </Button>
            </form>
        </div>

    )
}

export default LoginComponent;