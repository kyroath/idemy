import { Typography, makeStyles, Button } from "@material-ui/core";
import Image from "next/image";
import Rating from "@material-ui/lab/Rating";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import LectureListComponent from '../components/LectureListComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  appBar: {
    backgroundColor: "#fff",
  },

  header: {
    textAlign: "center",
    marginBottom: "1em",
  },

  info: {
    display: "flex",
    marginLeft: "5em",
    alignItems: 'center',
  },

  description: {
    marginLeft: "5em",
  },

  image: {
    alignSelf: 'center',
  },
  
  button:{
      marginLeft: '2em',
  }
}));





const CoursePageComponent = ({ courseId }) => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis dapibus dolor, interdum suscipit augue. Ut egestas porttitor nibh, et luctus augue finibus ut. Nunc dapibus, est sit amet rhoncus cursus, nunc lorem efficitur mauris, et iaculis neque tellus id velit. Vivamus vestibulum sagittis porttitor.";
  const [value, setValue] = useState(4);
  const classes = useStyles();
  return (
    <>
      <div className = {classes.root}>
        <Typography className={classes.header} variant="h4">
          Course Name
        </Typography>
        <div className={classes.info}>
          <Image className = {classes.image} src="/flutter.png" width={400} height={300} />
          <div style={{ marginLeft: "5em" }}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography align="center" variant="h6">
                Rating
              </Typography>
              <Rating name="read-only" value={value} readOnly />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography align="center" variant="h6">
                Price
              </Typography>
              <Typography align="center" variant="h6">
                ₺39.99
              </Typography>
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography align="center" variant="h6">
                Creator
              </Typography>
              <Typography align="center" variant="body1">
                Oğulcan Pirim
              </Typography>
            </Box>
          </div>
          <div style={{ width: "40%", marginLeft: "5em" }}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography align="left" variant="h6">
                Description
              </Typography>
              <Typography align="left" variant="body2">
                {lorem}
                {lorem}
              </Typography>
              <div style={{ marginTop:'2em' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Add to Bag
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  Add to Wishlist
                </Button>
                </div>
            </Box>
          </div>
        </div>
        <div style={{ marginTop:'2em' }}>
            <Typography className={classes.header} variant="h4">Lectures</Typography>
        </div>
        <LectureListComponent/>
      </div> 
    </>
  );
};

export default CoursePageComponent;
