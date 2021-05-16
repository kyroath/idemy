import Navbar from "../src/Navbar";
import CourseComponent from '../src/components/CourseComponent';


export default function Wishlist(){

    return (
        <div>
            <Navbar text = "WISHLIST" showMenu = "true" showSearch = "true"/>
            <CourseComponent isPurchased = "false" isFavorite = "true"></CourseComponent>
        </div>
    );
}