import { Typography } from "@material-ui/core";
import Navbar from "../src/Navbar";

export default function Wishlist(){

    return (
        <div>
            <Navbar showMenu = "true" showSearch = "true"/>
            <Typography variant = "h5">
                My Wishlist
            </Typography>
        </div>
    );
}