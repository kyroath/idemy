import { Typography , makeStyles} from "@material-ui/core";
import Image from 'next/image';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        backgroundColor : '#fff',
    },
    
    paper:{
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
    },
    headerSize:{
        fontSize: '0.2em',
    },
}));

const CoursePageComponent = ({courseId}) => {

    const classes = useStyles();
    return (
        <>
            <div className = {classes.paper}>
            <Typography variant="h4">Course Name</Typography>
            <Image
                        src="/flutter.png"
                        width={400}
                        height={300}
            />
            </div>
        </>
    );
}

export default CoursePageComponent;