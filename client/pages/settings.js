import { makeStyles, Container, Paper} from "@material-ui/core";
import SettingsComponent from "../src/components/forms/SettingsComponent";

import Navbar from "../src/Navbar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        marginTop: theme.spacing(4),
      },
  }));
  
export default function Settings() {

    const classes = useStyles();
    
    return (
        <>
        <Navbar text="SETTINGS" showMenu="true" />
        <Container maxWidth="sm">
            <Paper square className={classes.root} variant="outlined">
                <SettingsComponent/>
            </Paper>
        </Container>
        </>
    );
}