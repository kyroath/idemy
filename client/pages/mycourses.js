import { Typography } from "@material-ui/core";
import CourseComponent from "../src/components/CourseComponent";
import Navbar from "../src/Navbar";


export default function MyCourses(){

    return(
        <div>
            <Navbar text = "MY COURSES" showMenu = "true" showSearch = "true"/>
            <CourseComponent isPurchased = "true"></CourseComponent>
        </div>
    );
}

