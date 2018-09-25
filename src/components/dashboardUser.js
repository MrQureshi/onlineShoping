
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
import { connect } from 'react-redux'
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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {fnCart} from '../action'

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
        marginRight: -8
    }
});

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
            vertical: 'bottom',
            horizontal: 'center',
            open: false,
            cartItem: [],
            itemLength: 0
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
            // console.log("ProductList?????????", ProductList)
            this.setState({
                productList: ProductList
            })
            // this.props.fnCategory(categoryList);
        })
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleAddItem(item, index) {
        // console.log("itemmm", item)
        // let getData = JSON.parse(localStorage.getItem("addtocart"));
        let itemsArray = JSON.parse(localStorage.getItem('items', JSON.stringify([item]))) ? JSON.parse(localStorage.getItem('items')) : [];

        itemsArray.push(item);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        // this.setState({
        //     storageData: itemsArray
        // })
        // console.log(JSON.parse(localStorage.getItem('items')))
        let array = JSON.parse(localStorage.getItem('items'))


        // console.log("array", array)
        let original = [];

        array ?
            array.map((list, index) => {
                // console.log(list)
                let tmpStr = JSON.stringify(list)
                var newStr = tmpStr.substring(1, tmpStr.length - 1);

                // console.log("new", newStr)
                return (original.push(newStr))

            })
            : null
        //   console.log("org", original)

        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);

        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {

            var myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i] === copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }
            if (myCount > 0) {
                var a = {}

                var b = {};

                b.obj = original[i];
                let inString = b
                let getObj

                for (let key in inString) {
                    // console.log("for", b[key])
                    let mystring = inString[key]
                    mystring = ('{' + mystring + '}')
                    // console.log("mysttt", mystring)
                    let prs = JSON.parse(mystring);
                    // console.log("perse", prs)

                    getObj = prs
                }
                a.value = getObj;
                a.count = myCount;
                compressed.push(a);
            }
            // if (myCount > 0) {
            //     var a = new Object();
            //     a.value = original[i];
            //     a.count = myCount;
            //     compressed.push(a);
            // }
        }
        // console.log("compressed", compressed)
        let cartItem=[]
        cartItem= compressed;

        this.props.fnCart(cartItem);
        this.setState({
            cartItem: compressed,
            open: true,
            // itemLength: compressed.length
        })
        // this.handleQty()

    }
    // handleQty(){
    //     this.state.cartItem.map((data,index) => {
    //         console.log(data.count)
    //     })
    // }
    render() {
        console.log(this.state.cartItem)
        const { classes } = this.props;
        const { open, productList, vertical, horizontal, itemLength } = this.state
        console.log("Render", itemLength)

        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Paper className={classes.paper}  >
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
                                            {/* <Typography variant="subheading" className={classes.showLeft} component="p">
                                                Qty {0}
                                            </Typography> */}
                                            {/* <IconButton aria-label="Share">
                                                <ShareIcon />
                                            </IconButton> */}

                                            <IconButton className={classes.showLeft} onClick={() => this.handleAddItem(proList, index)} aria-label="Add to cart">
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

                                    </Card>
                                    {/* ////////XXXXXXXXXX////////// */}

                                </Fragment>
                            )
                        })
                    }
                </MuiThemeProvider>
                {/* {
                    this.state.cartItem.map((data, index) => {


                        console.log(data.count)
                    })
                } */}
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    autoHideDuration={2000}
                >

                    <SnackbarContent
                        style={styles.snaperbg}
                        message={<span>Product Added to your Cart</span>}
                    />
                </Snackbar>
            </Fragment>
        )
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};function mapStateToProps(state) {
    const { cartItem } = state;
    console.log("state in UserDashboard", state)
    return {
        cartItem
    };
} 
export default connect(mapStateToProps, {fnCart})( withStyles(styles)(Dashboard))

