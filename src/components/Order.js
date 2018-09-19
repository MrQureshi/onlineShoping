
import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';
// import LockIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import { TextField, Button } from '@material-ui/core';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Input from '@material-ui/core/Input';
// import { FormControl } from '@material-ui/core';
// import { firebaseApp } from '../firebase'
// import * as firebase from 'firebase';
// import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#00bcd4' }, // Purple and green play nicely together.
        secondary: { main: '#00bcd4' }, // This is just green.A700 as hex.
    },
});
const styles = {
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
    avatar: {
        margin: "auto",
        backgroundColor: "#f50057",
        marginBottom: 10
    },
    root: {
        color: "#006974",
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    image:{
        width:60,
        height:80
    }
    // buttonProgress: {
    //     color: "#00bcd4",
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     marginTop: -12,
    //     marginLeft: -12,
    // }
};
class Order extends Component {
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
                            <Grid style={styles.flex} item xs={12}>
                                <Typography variant="display1">
                                    Add to Cart
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container>
                        <Grid style={styles.flex} item xs={1}></Grid>
                        <Grid style={styles.flex} item xs={10}>
                            {/* Email: "admin@gmail.com"
                            catKey: "-LMgp1VuNW5XnIUdSmV0"
                            categoryName: "Mobiles"
                            imageURL: "https://firebasestorage.googleapis.com/v0/b/onlineshoping-0.appspot.com/o/productImages%2Fkisspng-crystal-mountain-water-cooler-bottled-water-blue-bucket-5a7e5bc5bd7552.2645095515182304697761.jpg?alt=media&token=9a6c6852-c549-44ae-a3b5-96c860d79e88"
                            key: "-LMkhCe0EvDknCCDEPXB"
                            productDescription: "qwqwewqe"
                            productName: "aqwq"
                            productPrice: "1002"
                            userKey: "lzymc40quWXW5aVNlkNQcQ61Brx1" */}
    
                            <Fragment>
                                <Table style={styles.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Fat (g)</TableCell>
                                            <TableCell>Carbs (g)</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            JSON.parse(localStorage.getItem('items')).map((item, index) => {
                                                return (

                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row">
                                                            {item.productName}
                                                        </TableCell>
                                                        <TableCell>{item.productPrice}</TableCell>
                                                        <TableCell><img style={styles.image} src={item.imageURL}  />
                                                        </TableCell>
                                                        {/* <TableCell>{row.carbs}</TableCell>
                                                        <TableCell>{row.protein}</TableCell> */}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </Fragment>


                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default Order;

