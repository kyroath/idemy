import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  CardContent,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { TimelineTwoTone } from "@material-ui/icons";
import { useState } from "react";
import MessageComponent from "../components/MessageComponent";
import FavComponent from "./FavComponent";
import ShopComponent from "./ShopComponent";

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

const CardComponent = ({
  image,
  courseName,
  courseSummary,
  coursePrice,
  isPurchased,
}) => {
  const [favMessage, setFavMessage] = useState(false);
  const [shopMessage, setShopMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [shop, setShop] = useState(false);
  const [messageText, setMessageText] = useState("");

  const timeInterval = 1000;

  const addFavorite = (text) => {
    if (shop) setShopMessage(false);
    setFavorite(!favorite);
    setFavMessage(true);
    if (!favorite) setMessageText(courseName + " has been added to wishlist !");
    else setMessageText(courseName + " has been removed from wishlist !");
    setTimeout(function () {
      setFavMessage(false);
    }, timeInterval);
  };

  const addShop = (text) => {
    if (favorite) setFavMessage(false);
    setShop(!shop);
    setShopMessage(true);
    if (!shop) setMessageText(courseName + " has been added to shop !");
    else setMessageText(courseName + " has been removed from shop !");
    setTimeout(function () {
      setShopMessage(false);
    }, timeInterval);
  };

  const classes = useStyles();
  return (
    <>
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
          <IconButton
            onClick={() => {
              addFavorite(courseName);
            }}
          >
            <FavComponent isFavorite={favorite} />
          </IconButton>
          <IconButton
            onClick={() => {
              addShop(courseName);
            }}
          >
            <ShopComponent isAdded={shop} />
          </IconButton>
          {isPurchased === "false" ? (
            <Typography
              variant="h5"
              component="h2"
              className={classes.priceText}
            >
              ${coursePrice}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              component="h3"
              className={classes.priceText}
            >
              Purchased
            </Typography>
          )}
        </CardActions>
      </Card>
      <MessageComponent
        open={favMessage}
        text={messageText}
        type="error"
      ></MessageComponent>
      <MessageComponent
        open={shopMessage}
        text={messageText}
        type="success"
      ></MessageComponent>
    </>
  );
};

export default CardComponent;
