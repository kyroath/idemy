import { TextField, Typography, Button,makeStyles} from "@material-ui/core"
import { useState } from "react";
import * as yup from "yup";
import MessageComponent from "../MessageComponent";

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


const SettingsComponent = () => {

    const [update, setUpdate] = useState(false);
    const name = "Oğulcan";
    const surname = "Pirim";
    const email = "opirim@gmail.com";

    const classes = useStyles();
    const timeInterval = 2000;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(true);
        setTimeout(function () {
            setUpdate(false);
        }, timeInterval);
    }
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Update Your Account
            </Typography>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="firstname"
                    value={name}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="lastname"
                    value={surname}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                />              
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.submit}
                    >UPDATE
            </Button>
            </form>
            <MessageComponent open = {update} text = "Account details updated ! " type = "success"/>
        </div>
    );
}

export default SettingsComponent;