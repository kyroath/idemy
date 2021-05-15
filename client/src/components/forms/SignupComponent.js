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
}));


const SignupComponent = (props) => {

    const [check, setCheck] = useState(false);
    const classes = useStyles();
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const timeInterval = 2000;

    const initializeErrors = () => ({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirm: "",
      });

    const resetValues = () => {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirm("");
    };
    
    const [errors, setErrors] = useState(initializeErrors());
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(initializeErrors());

        const schema = yup.object().shape({
            name: yup
                .string()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .required("First name is required"),
            surname: yup
                .string()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid surname')
                .required("Last name is required"),
            email: yup
                .string()
                .email("Email must be a valid email")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required"),
            confirm: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required("Confirm Password is required")
        });

        let valid = false;

        try {
            valid = await schema.validate({ name, surname, email, password, confirm}, { abortEarly: false }); // get all the errors
          } catch (e) {
            const temp = {};
            e.inner.forEach((err) => {
              temp[err.path] = err.message;
            });
      
            setErrors({ ...initializeErrors(), ...temp });
        }

        if (valid){
            resetValues();
            setCheck(true);
            setTimeout(
                function () {
                    setCheck(false);
                },timeInterval
            );
        }
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Create Your Account
            </Typography>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    error={errors.name.length !== 0}
                    helperText={errors.name.length !== 0 ? errors.name : null}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="firstname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    error={errors.surname.length !== 0}
                    helperText={errors.surname.length !== 0 ? errors.surname : null}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="lastname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                    error={errors.email.length !== 0}
                    helperText={errors.email.length !== 0 ? errors.email : null}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    error={errors.password.length !== 0}
                    helperText={errors.password.length !== 0 ? errors.password : null}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    error={errors.confirm.length !== 0}
                    helperText={errors.confirm.length !== 0 ? errors.confirm : null}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
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
            <MessageComponent open = {check} text = "Account successfully created ! You can login." type = "success"/>
        </div>
    )
}

export default SignupComponent;