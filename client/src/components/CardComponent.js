import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  makeStyles,
  Button,
  Container,
  Grid,
  ButtonBase,
} from "@material-ui/core";
import React from "react";
//import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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

const CardComponent = ({ image, courseName, courseSummary, coursePrice , isPurchased}) => {
  
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={image ? image : "https://source.unsplash.com/random"}
        title={courseName ? courseName : "Default Image"}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {courseName}
        </Typography>
        <Typography>{courseSummary}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="large" color="primary">
          View
        </Button>
        {isPurchased === "false" ?
        <Typography
        variant="h5" 
        component="h2" 
        className={classes.priceText}>
        ${coursePrice}  
        </Typography>
        :
        <Typography 
        variant="h6" 
        component="h3" 
        className={classes.priceText}>
        Purchased  
        </Typography>
        }
      </CardActions>
    </Card>
  );
};

export default CardComponent;
