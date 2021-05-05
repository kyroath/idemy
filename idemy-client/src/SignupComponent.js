import { TextField, Typography, Button, ma, makeStyles} from "@material-ui/core"

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
    typo: {
        marginTop: theme.spacing(3),
    }
}));


const SignupComponent = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Create Your Account
            </Typography>
            <form className={classes.form} autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="firstname"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="lastname"
                />
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
                    >SIGN UP
            </Button>
            </form>
        </div>
    )
}

export default SignupComponent;