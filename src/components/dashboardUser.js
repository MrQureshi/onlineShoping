
import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
// import Toolbar from '@material-ui/core/Toolbar';
// import Avatar from '@material-ui/core/Avatar';
// import LockIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper } from '@material-ui/core';
// import { TextField, Button } from '@material-ui/core';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Input from '@material-ui/core/Input';
// import { FormControl } from '@material-ui/core';
// import { firebaseApp } from '../firebase'
import * as firebase from 'firebase';
// import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Addcategory from './Addcategory'
// import { fnCategory } from '../action'
// import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// import ViewIcon from '@material-ui/icons/Visibility';
// import Showproduct from './Showproducts'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#00bcd4' }, // Purple and green play nicely together.
        secondary: { main: '#008394' }, // This is just green.A700 as hex.
    },
});
const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    card: {
        width: 300,
        marginTop: 10,
        marginRight: 10,
    },
    paper: {
        flex: 1,
        padding: 10,
        // paddingTop: 30,
        width: '100%',
        // marginLeft: '50%',
        // marginTop: 10,
        // marginBottom: 10,
        height: 60,
        // overflowY: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '50.25%', // 16:9
        backgroundSize: "contain"
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    priceTag: {
        color: red[500]
    },
    showLeft: {
        marginLeft: 'auto',
    }
});

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {

            productList: []
        }
    }
    componentDidMount() {
        firebase.database().ref('Product').on('value', snap => {
            // console.log("hghhgv")
            let objProducts = snap.val();
            // console.log("objCategory", objProducts)
            let ProductList = [];
            for (let key in objProducts) {
                // console.log("First For", objProducts[key])
                let getData = objProducts[key]
                for (let key in getData) {
                    // console.log("2nd for ", getData[key])
                    ProductList.push({ ...getData[key], key });
                }
            }
            // console.log("ProductList", ProductList)
            this.setState({
                productList: ProductList
            })
            // this.props.fnCategory(categoryList);
        })
    }
    handleAddItem(item) {
        // console.log("itemmm", item)
        // let getData = JSON.parse(localStorage.getItem("addtocart"));
        let itemsArray =JSON.parse(localStorage.getItem('items', JSON.stringify([item]))) ? JSON.parse(localStorage.getItem('items')) : [];

        itemsArray.push(item);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        // this.setState({
        //     storageData: itemsArray
        // })
        console.log(JSON.parse(localStorage.getItem('items')))
    }
    render() {
        const { classes } = this.props;
        const { productList } = this.state
        console.log("Render", productList)
        return (
            // <div><h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1></div>
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Paper  className={classes.paper}  >
                        <Grid container>
                            <Grid style={styles.flex} item xs={10}>
                                <Typography variant="display1">
                                    Products
                                </Typography>

                            </Grid>
                            {/* <Grid  style={styles.flex} item xs={2}>  */}
                            {/* <Button  variant="outlined">add category</Button> */}
                            {/* <Addcategory /> */}
                            {/* </Grid> */}
                        </Grid>
                    </Paper>
                    {
                        this.state.productList.map((proList, index) => {
                            return (
                                <Fragment key={index}>
                                    {/* ////////XXXXXXXXXX//////// */}
                                    <Card style={{ float: "left" }} className={classes.card}>
                                        <CardHeader
                                            // avatar={
                                            //     <Avatar aria-label="Recipe" className={classes.avatar}>
                                            //         R
                                            // </Avatar>
                                            // }
                                            // action={
                                            //     <IconButton>
                                            //         <MoreVertIcon />
                                            //     </IconButton>
                                            // }
                                            title={proList.productName}
                                        // subheader="September 14, 2016"
                                        />
                                        <Divider />
                                        <CardMedia
                                            className={classes.media}
                                            image={proList.imageURL}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                {
                                                    proList.productDescription
                                                }
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.actions} disableActionSpacing>
                                            <Typography variant="subheading" className={classes.priceTag} component="p">
                                                PKR: {proList.productPrice}
                                            </Typography>
                                            {/* <IconButton aria-label="Share">
                                                <ShareIcon />
                                            </IconButton> */}

                                            <IconButton className={classes.showLeft} onClick={() => this.handleAddItem(proList)} aria-label="Add to cart">
                                                    <AddIcon />
                                                </IconButton>
                                            {/* <IconButton
                                                className={classnames(classes.expand, {
                                                    [classes.expandOpen]: this.state.expanded,
                                                })}
                                                onClick={this.handleExpandClick}
                                                aria-expanded={this.state.expanded}
                                                aria-label="Show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton> */}
                                        </CardActions>
                                        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph variant="body2">
                                                    Method:
                                                </Typography>
                                                <Typography paragraph>
                                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                                    minutes.
                                                </Typography>
                                                <Typography paragraph>
                                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                                    chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                                    salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                                    minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                                </Typography>
                                                <Typography paragraph>
                                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                                    to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                                    cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                                    minutes more. (Discard any mussels that don’t open.)
                                                </Typography>
                                                <Typography>
                                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                                </Typography>
                                            </CardContent>
                                        </Collapse> */}
                                    </Card>
                                    {/* ////////XXXXXXXXXX////////// */}

                                </Fragment>
                            )
                        })
                    }
                </MuiThemeProvider>
            </Fragment>
        )
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Dashboard)

