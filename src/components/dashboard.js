
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
import Addcategory from './Addcategory'
import { fnCategory } from '../action'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// import ViewIcon from '@material-ui/icons/Visibility';
import Showproduct from './Showproducts'

import Divider from '@material-ui/core/Divider';
import Addproduct from './Addproduct'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#00bcd4' }, // Purple and green play nicely together.
        secondary: { main: '#008394' }, // This is just green.A700 as hex.
    },
});
const styles = {

    grow: {
        flexGrow: 1,
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
        width: 200,
        height: 100,
        margin: 10,
        padding: 10,
    },
    avatar: {
        margin: "auto",
        backgroundColor: "#f50057",
        marginBottom: 10
    },
    root: {
        color: "#006974",
    },
    // buttonProgress: {
    //     color: "#00bcd4",
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     marginTop: -12,
    //     marginLeft: -12,
    // }
};
class Dashboard extends Component {
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
        return (
            // <div><h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1>
            // <h1>This is order page</h1></div>
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Paper style={styles.paper} >
                        <Grid container>
                            <Grid style={styles.flex} item xs={10}>
                                <Typography variant="display1">
                                    Category
                                </Typography>

                            </Grid>
                            <Grid style={styles.flex} item xs={2}>
                                {/* <Button  variant="outlined">add category</Button> */}
                                <Addcategory />
                            </Grid>
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

                                            {/* <IconButton aria-label="Delete" style={{ float: "Right" }}>
                                                <ViewIcon variant="fab" />
                                            </IconButton> */}
                                            <Showproduct showProductProps={catList}/>
                                            <Addproduct addProductProps={catList} />
                                            {/* <IconButton aria-label="Delete" style={{ float: "Right" }}>
                                                <AddIcon />
                                            </IconButton> */}
                                            <IconButton aria-label="Delete" style={{ float: "Right" }}>
                                                <DeleteIcon variant="fab" />
                                            </IconButton>
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
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    const { categoryList } = state;
    console.log("state in Dashboard", state)
    return {
        categoryList
    };
}
export default connect(mapStateToProps, { fnCategory })(Dashboard)

