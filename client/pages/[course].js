import { useRouter } from "next/router";
import CoursePageComponent from "../src/components/CoursePageComponent";
import Navbar from "../src/Navbar";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '70%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    margin: 'auto',
  },
}));

const course = () => {
  const classes = useStyles();
  const router = useRouter();
  const { course } = router.query;
  return (
    <>
        <Navbar text="COURSE PAGE" showMenu="true" showSearch="false" />
        <Paper square className={classes.root} variant="outlined">
            <CoursePageComponent courseId={course}></CoursePageComponent>
        </Paper>
    </>
  );
};

export default course;
