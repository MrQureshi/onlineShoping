import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ViewIcon from '@material-ui/icons/Visibility';
import * as firebase from 'firebase';
import red from '@material-ui/core/colors/red';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import classnames from 'classnames';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Divider } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import { get } from 'http';
// const styles = {

// };
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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class showProduct extends React.Component {
    state = {
        open: false,
        productList: [],
        expanded: false,
        storageData: ""
    };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleClickOpen = () => {
        this.setState({ open: true });

        let selectedCategory = this.props.showProductProps


        // console.log("selectedCategory", selectedCategory);

        let catKey = selectedCategory.key;

        // console.log("catKey", catKey)
        firebase.auth().onAuthStateChanged((user) => {
            // console.log("currentUser.uid", user.email, user.uid)


            if (user) {
                firebase.database().ref('Product/' + catKey).on('value', snap => {
                    let objProduct = snap.val();
                    // console.log("obj", objProduct)

                    let productList = [];
                    for (let key in objProduct) {
                        
                        if (user.uid === objProduct[key].userKey) {
                               
                                productList.push({ ...objProduct[key], key });
                        }
                        
                        // for (let key in getData) {
                            // console.log("??", getData[key].userKey)
                            
                        // }



                        // productList.push({ ...objProduct[key], key });
                    }

                    // console.log("productList", productList)

                    this.setState({
                        productList
                    })
                })
            }
        })
    };
    handleClose(e) {
        e.preventDefault()
        this.setState({ open: false });
        // window.location.reload();
    };
    handleAddItem(item) {
        // console.log("itemmm", item)
        // let getData = JSON.parse(localStorage.getItem("addtocart"));
        let itemsArray = JSON.parse(localStorage.getItem('items', JSON.stringify([item]))) ? JSON.parse(localStorage.getItem('items')) : [];

        itemsArray.push(item);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        // this.setState({
        //     storageData: itemsArray
        // })
        // console.log(JSON.parse(localStorage.getItem('items')))
    }
    render() {
        // console.log("render", this.state.storageData)
        const { classes } = this.props;
        return (
            <div>
                <IconButton onClick={this.handleClickOpen}>
                    <ViewIcon />
                </IconButton>
                {/* <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button> */}
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={(e) => this.handleClose(e)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Product
                            </Typography>
                            {/* <Button color="inherit" onClick={this.handleClose}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <div style={{
                        flexDirection: "row", display: "flex",
                        //  flexWrap:"wrep",
                    }}>
                        {
                            this.state.productList.length ?
                            this.state.productList.map((proList, index) => {
                                return (
                                    <Fragment key={index}>
                                        {/* ////////XXXXXXXXXX//////// */}
                                        <Card style={{ float: "right" }} className={classes.card}>
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

                                                {/* <IconButton className={classes.showLeft} onClick={() => this.handleAddItem(proList)} aria-label="Add to cart">
                                                    <AddIcon />
                                                </IconButton> */}
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
                            }) :
                            <Typography style={{paddingLeft :"40%", paddingTop: 10 }} align='center' variant="subheading">
                                Sorry! You have no product in this cetagory
                            </Typography>
                        }

                    </div>
                    {/* <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List> */}
                </Dialog>
            </div>
        );
    }
}
showProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(showProduct);