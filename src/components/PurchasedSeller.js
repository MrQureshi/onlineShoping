
import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
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
// import * as firebase from 'firebase';
// import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import TablePagination from '@material-ui/core/TablePagination';

import { connect } from 'react-redux'
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
    // buttonProgress: {
    //     color: "#00bcd4",
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     marginTop: -12,
    //     marginLeft: -12,
    // }
};
class Purchased extends Component {
    constructor() {
        super();
        this.state = {
            PurchaseList: [],
            page: 0,
            rowsPerPage: 5,
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    componentWillMount() {
        const { Email, key } = this.props.user;
        console.log("wiill", Email, key)

        firebase.database().ref('Cart').on('value', snap => {
            let objPurchase = snap.val();
            console.log("obj?????", objPurchase)
            let PurchaseList = [];
            for (let key in objPurchase) {
                let getData = objPurchase[key]
                for (let key in getData) {
                    console.log("2nd", getData[key].sellerEmail)
                    if (Email === getData[key].sellerEmail) {
                        PurchaseList.push({ ...getData[key], key });
                    }
                }
            }
            console.log("PurchaseList", PurchaseList)
            this.setState({
                PurchaseList
            })
        })
    }
    render() {
        const{page, rowsPerPage} = this.state
        
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
                                <Typography align="center" variant="display1">
                                    Purchased Items
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Fragment>
                        <Table style={styles.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>TotalPrice</TableCell>

                                    {/* <TableCell></TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.PurchaseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((purList, index) => {
                                        let date = new Date(purList.date)
                                        // console.log("date", date.toLocaleDateString())
                                        let dt = date.toLocaleDateString()



                                        return (
                                            // Email: "admin@gmail.com"
                                            // Quantity: 1
                                            // Total: 1002
                                            // categoryName: "Mobiles"
                                            // date: 1537606122794
                                            // key: "-LN-Srnx25xeqkqNu9O2"
                                            // productKey: "-LMkhCe0EvDknCCDEPXB"
                                            // productName: "aqwq"
                                            // productPrice: "1002"



                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {purList.productName}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        dt
                                                    }
                                                </TableCell>
                                                <TableCell>{purList.productPrice}</TableCell>
                                                {/* <TableCell><img alt={item.value.productName} style={styles.image} src={item.value.imageURL} /> */}
                                                {/* </TableCell> */}
                                                <TableCell>{purList.Quantity}</TableCell>
                                                <TableCell>
                                                    {
                                                        purList.Total

                                                    }
                                                </TableCell>
                                                {/* <TableCell>
                                                    <IconButton
                                                        // onClick={(e) => this.handleDelete(e, item.value.key)} 
                                                        color="inherit" aria-label="Delete">
                                                        <CloseIcon />
                                                    </IconButton>
                                                </TableCell> */}
                                            </TableRow>
                                        );
                                    })
                                }

                            </TableBody>
                            {/* <TableFooter>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                {
                                                    this.state.Total
                                                }
                                            </TableCell>
                                        </TableRow>
                                </TableFooter> */}
                        </Table>
                        <TablePagination
                            component="div"
                            count={this.state.PurchaseList.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />

                        {/* {
                            // Email: "admin@gmail.com"
                            // Quantity: 1
                            // Total: 1002
                            // categoryName: "Mobiles"
                            // date: 1537606122794
                            // key: "-LN-Srnx25xeqkqNu9O2"
                            // productKey: "-LMkhCe0EvDknCCDEPXB"
                            // productName: "aqwq"
                            // productPrice: "1002"

                            this.state.PurchaseList ?
                                this.state.PurchaseList.map((purList, index) => {
                                    return (
                                        <List key={index}>
                                            <ListItem button>
                                                <ListItemText primary={Email} secondary="Titania" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                                            </ListItem>
                                        </List>
                                    )
                                }

                                ) :
                                <Typography variant="headline" align="center">
                                    Empty
                                </Typography>
                        } */}
                    </Fragment>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    const { user, } = state;
    // console.log("state in addProduct", state)
    return {
        user,
    };
}

export default connect(mapStateToProps, null)(Purchased);

