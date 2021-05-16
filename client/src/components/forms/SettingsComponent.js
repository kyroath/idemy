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
    const [name,setName] = useState("Oğulcan");
    const [surname,setSurname] = useState("Pirim");
    const [email,setEmail] = useState("opirim@gmail.com");


    const classes = useStyles();
    const timeInterval = 2000;

    const initializeErrors = () => ({
        name: "",
        surname: "",
        email: "",
    });

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
        });
    
        let valid = false;
    
        try {
          valid = await schema.validate({ name, surname, email }, { abortEarly: false }); 
        } catch (e) {
          const temp = {};
          e.inner.forEach((err) => {
            temp[err.path] = err.message;
          });
    
          setErrors({ ...initializeErrors(), ...temp });
        }
    
        if (valid){
            setUpdate(true);
            setTimeout(function () {
                setUpdate(false);
            }, timeInterval);
        }
      };
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Update Your Account
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
                    defaultValue={name}
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
                    defaultValue={surname}
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
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
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