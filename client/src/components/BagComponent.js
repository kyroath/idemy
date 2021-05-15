import { DataGrid } from "@material-ui/data-grid";
import { Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import MessageComponent from "../components/MessageComponent";

const useStyles = makeStyles((theme) => ({
  checkout: {
    margin: theme.spacing(4, 0, 5),
  },
  root: {
    marginTop: "4em",
  },
  cancelButton : {
    margin: theme.spacing(4, 0, 5),
    marginLeft: "2em",
  }
}));

const columns = [
  { field: "id", headerName: "Course ID", width: 130, headerAlign: 'center', align: 'center'},
  { field: "coursename", headerName: "Course Name", flex: 0.5 },
  { field: "creator", headerName: "Creator", flex: 0.6 },
  { field: "price", headerName: "Price", flex: 0.1, headerAlign: 'center', align: 'center'},
];

const rows = [
  { id: 1, coursename: "Course#1", creator: "Jon", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 2, coursename: "Course#2", creator: "Cersei", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 3, coursename: "Course#3", creator: "Jaime", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 4, coursename: "Course#4", creator: "Arya", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 5, coursename: "Course#5", creator: "Daenerys", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 6, coursename: "Course#6", creator: "Jaime ", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 7, coursename: "Course#7", creator: "Ferrara", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 8, coursename: "Course#8", creator: "Rossini", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
  { id: 9, coursename: "Course#9", creator: "Harvey", price: `₺${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 100)}` },
];

const BagComponent = () => {
  const [cancel, setCancel] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const classes = useStyles();
  const pageSize = 10;
  const timeInterval = 1500;
  const currentlySelected = (selections) => {
    setCancel(selections.selectionModel.length > 0);
    // Deletion of rows
    //console.log(selections.selectionModel.length);
  };

  const showCancel = () => {
    setType("error");
    setMessage("Selected items removed from bag !");
    setShow(true);
    setTimeout(function () {
        setShow(false);
    }, timeInterval);
  }
  const showCheckout = () => {
    setType("success");
    setMessage("Bag items added to your course list!");
    setShow(true);
    setTimeout(function () {
        setShow(false);
    }, timeInterval);
  }
  return (
    <div className={classes.root}>
      <div style={{ height: 800, width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          checkboxSelection
          onSelectionModelChange={currentlySelected}
        />
        <Button
          onClick = {showCheckout}
          variant="contained"
          color="secondary"
          size="large"
          className={classes.checkout}
        >
          Checkout
        </Button>
        {cancel ? (
          <Button
            onClick = {showCancel}
            variant="contained"
            color="secondary.cancel_button"
            size="large"
            className={classes.cancelButton}
          >
            Remove From Bag
          </Button>
        ) : (
          <></>
        )}
      </div>
      <MessageComponent text = {message} open = {show} type = {type} />
    </div>
  );
};

export default BagComponent;
