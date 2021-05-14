import { Typography } from "@material-ui/core";
import Navbar from "../src/Navbar";


export default function MyCourses(){

    return(
        <div>
            <Navbar showMenu = "true" showSearch = "true"></Navbar>
            <Typography variant = "h5">
                My Courses
            </Typography>
        </div>
    );
}

