import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const MessageComponent = ({ text, type, open }) => {

    const [close, setClose] = useState(false);

    const handleClose = () => {
        setClose(true);
    ;}
    return (
        <>
        <Snackbar
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
            }}
            open={open}
        >
            <Alert severity="success" color={type}>{text}</Alert>
        </Snackbar>
        </>
    );
    };

export default MessageComponent;
