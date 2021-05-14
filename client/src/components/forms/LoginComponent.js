import * as yup from "yup";
import { useRouter } from "next/router";
import { Typography, TextField, Button, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "80%",
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(4, 0, 5),
  },
}));

const LoginComponent = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initializeErrors = () => ({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(initializeErrors());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initializeErrors());

    const schema = yup.object().shape({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    let valid = false;

    try {
      valid = await schema.validate({ email, password }, { abortEarly: false }); // get all the errors
    } catch (e) {
      const temp = {};
      e.inner.forEach((err) => {
        temp[err.path] = err.message;
      });

      setErrors({ ...initializeErrors(), ...temp });
    }

    if (valid)
      router.push("/home");

  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign in to your Account
      </Typography>
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          className={classes.submit}
        >
          SIGN IN
        </Button>
      </form>
    </div>
  );
};

export default LoginComponent;
