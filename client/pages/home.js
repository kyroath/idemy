import { Button, ToolBar, handleDrawerOpen } from '@material-ui/core';
import Navbar from '../src/Navbar';
import CourseComponent from '../src/components/CourseComponent';

export default function Home(){

    return (
        <div>
            <Navbar text = "HOME" showMenu = "true" showSearch = "true"/>
            <CourseComponent isPurchased = "false"></CourseComponent>
        </div>
    )

}