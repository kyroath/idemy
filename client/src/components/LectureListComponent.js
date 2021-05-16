import { makeStyles, Typography } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    margin: "auto",
    width: "70%",
  },
}));

const LectureListComponent = ({ courseId }) => {
  const classes = useStyles();
  const router = useRouter();
  const lectures = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  return (
    <>
      <Paper square className={classes.paper} variant="outlined">
        <List component="nav" className={classes.root}>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[0] + " - Lecture#1"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[1] + " - Lecture#2"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[2] + " - Lecture#3"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[3] + " - Lecture#4"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[4] + " - Lecture#5"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[5] + " - Lecture#6"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[6] + " - Lecture#7"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[7] + " - Lecture#8"} />
          </ListItem>
          <ListItem button divider>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={lectures[8] + " - Lecture#9"} />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default LectureListComponent;
