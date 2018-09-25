
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
import { fnCategory } from '../action'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
// import Showproduct from './ShowproductsSeller'

import red from '@material-ui/core/colors/red';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';


import Divider from '@material-ui/core/Divider';
import Addproduct from './Addproduct'

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
// const styles = {

//     grow: {
//         flexGrow: 1,
//     },
//     paper: {
//         flex: 1,
//         padding: 10,
//         // paddingTop: 30,
//         width: '100%',
//         // marginLeft: '50%',
//         // marginTop: 10,
//         // marginBottom: 10,
//         height: 60,
//         // overflowY: 'auto',
//     },
//     card: {
//         width: 200,
//         height: 100,
//         margin: 10,
//         padding: 10,
//     },
//     avatar: {
//         margin: "auto",
//         backgroundColor: "#f50057",
//         marginBottom: 10
//     },
//     root: {
//         color: "#006974",
//     },
//     // buttonProgress: {
//     //     color: "#00bcd4",
//     //     position: 'absolute',
//     //     top: '50%',
//     //     left: '50%',
//     //     marginTop: -12,
//     //     marginLeft: -12,
//     // }
// };
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            catCom: true,
            productList: []
        }
    }
    handleView(e, list) {
        e.preventDefault()
        console.log(list)

        ////done////////////
        let selectedCategory = list

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
                    }

                    this.setState({
                        productList
                    })
                })
            }
        })
        ////Done///////////
        this.setState({
            catCom: false,
        })
    }
    handleClose(e) {
        e.preventDefault()
        this.setState({ catCom: true });
        // window.location.reload();
    };
    componentDidMount() {
        firebase.database().ref('Category').on('value', snap => {
            // console.log("hghhgv")
            let objCategory = snap.val();
            // console.log("objCategory", objCategory)
            let categoryList = [];
            for (let key in objCategory) {
                categoryList.push({ ...objCategory[key], key });
            }
            this.props.fnCategory(categoryList);
        })
    }
    render() {
        const { classes } = this.props;
        return (
            this.state.catCom ?
                <Fragment>
                    <MuiThemeProvider theme={theme}>
                        <Paper className={classes.paper} >
                            <Grid container>
                                <Grid style={styles.flex} item xs={10}>
                                    <Typography variant="display1">
                                        Category
                                </Typography>

                                </Grid>
                                {/* <Grid style={styles.flex} item xs={2}> */}
                                {/* <Button  variant="outlined">add category</Button> */}
                                {/* <Addcategory /> */}
                                {/* </Grid> */}
                            </Grid>
                        </Paper>
                        {
                            this.props.categoryList.map((catList, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Card style={{ width: 200, height: 140, margin: 10, padding: 10, float: "left" }}>
                                            <Typography variant="headline"
                                                // style={{color:"#00bcd4"}} 
                                                component="h2">
                                                {
                                                    catList.categoryName
                                                }
                                            </Typography>
                                            <br />
                                            <Typography color="textSecondary">
                                                {
                                                    catList.description
                                                }
                                                <br />
                                                {/* {'"a benevolent smile"'} */}
                                            </Typography>
                                            <Divider />
                                            <CardActions style={{ float: "right" }} >

                                                <IconButton onClick={(e) => this.handleView(e, catList)} aria-label="View" style={{ float: "Right" }}>
                                                    <ViewIcon variant="fab" />
                                                </IconButton>
                                                {/* <Showproduct showProductProps={catList}/> */}
                                                <Addproduct addProductProps={catList} />
                                                {/* <IconButton aria-label="Delete" style={{ float: "Right" }}>
                                                <AddIcon />
                                            </IconButton> */}
                                                {/* <IconButton aria-label="Delete" style={{ float: "Right" }}>
                                                <DeleteIcon variant="fab" />
                                            </IconButton> */}
                                                {/* <Button variant='fab' color="primary" size="small">
                                                <AddIcon />
                                            </Button>
                                            <Button variant='fab' color="primary" size="small">
                                                <AddIcon />
                                            </Button> */}
                                            </CardActions>
                                        </Card>
                                    </Fragment>
                                )
                            })
                        }
                    </MuiThemeProvider>
                </Fragment> :
                <div>
                    <Fragment>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid  item xs={11}>
                                    <Typography variant="display1">
                                        Products
                                </Typography>
                                </Grid>
                                <Grid  item xs={1}>
                                    <IconButton color="inherit" onClick={(e) => this.handleClose(e)} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>

                                </Grid>

                            </Grid>
                        </Paper>
                    </Fragment>
                    {
                        this.state.productList.length ?
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
                                           
                                        </Card>

                                    </Fragment>
                                )
                            }) :
                            <Typography style={{ paddingLeft:0 , paddingTop: 10 }} align='center' variant="subheading">
                                Sorry! You have no product in this cetagory
                            </Typography>
                    }
                </div >
        )
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    const { categoryList } = state;
    console.log("state in Dashboard", state)
    return {
        categoryList
    };
}
export default connect(mapStateToProps, { fnCategory })(withStyles(styles)(Dashboard))

