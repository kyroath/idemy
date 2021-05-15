import {
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import { PinDropSharp } from "@material-ui/icons";
import React from "react";

import CardComponent from "./CardComponent";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },

  priceText: {
    marginRight: "0.4em",
    marginLeft: "auto",
  },
}));

const CourseComponent = (props) => {
  const classes = useStyles();
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis dapibus dolor, interdum suscipit augue. Ut egestas porttitor nibh, et luctus augue finibus ut. Nunc dapibus, est sit amet rhoncus cursus, nunc lorem efficitur mauris, et iaculis neque tellus id velit. Vivamus vestibulum sagittis porttitor.";

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <CardComponent
              courseId = {`${index + 1}`}
              courseName={`Course #${index + 1}`}
              coursePrice={`${Math.floor(Math.random() * 50) + 20}.${Math.floor(
                Math.random() * 100
              )}`}
              courseSummary={lorem}
              isPurchased = {props.isPurchased}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseComponent;
