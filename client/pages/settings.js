import { Typography } from "@material-ui/core";
import Navbar from "../src/Navbar";


export default function Settings(){

    return(
        <div>
            <Navbar showMenu = "true"></Navbar>
            <Typography variant = "h5">
                Account Settings Page
            </Typography>
        </div>
    );
}