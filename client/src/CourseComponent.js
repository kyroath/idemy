import { Card, CardMedia, CardActionArea, CardActions, Typography, CardContent, makeStyles, Button, Container, Grid, ButtonBase } from '@material-ui/core';
import React from 'react';

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },

    priceText:{
        marginRight: '0.4em',
        marginLeft: 'auto',
    },
}));

const CourseComponent = (props) => {

    const classes = useStyles();
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card} >
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {"Course#" + card}
                                </Typography>
                                <Typography>
                                    {"Course#" + card + " description. Will put text later..."}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button size="large" color="primary">
                                    View
                                </Button>
                                <Typography variant="h7" component="h2" className={classes.priceText}>
                                    ₺39.99
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};


export default CourseComponent;