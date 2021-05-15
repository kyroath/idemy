import {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Navbar from "../src/Navbar";
import { Container } from "@material-ui/core";
import LoginComponent from "../src/components/forms/LoginComponent";
import SignupComponent from "../src/components/forms/SignupComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    marginTop: theme.spacing(4),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper square className={classes.root} variant="outlined">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="tabs-content"
          >
            <Tab aria-label="signup" label="SIGN UP" />
            <Tab aria-label="signin" label="SIGN IN" />
          </Tabs>
          {value === 1 ? <LoginComponent /> : <SignupComponent />}
        </Paper>
      </Container>
    </>
  );
}
