
import React, { Component, Fragment } from 'react';
import { Typography, Button, FormControl, TextField, } from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';
// import LockIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TableFooter from '@material-ui/core/TableFooter';
import firebase from 'firebase';
import { connect } from 'react-redux'

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
    paper1: {
        marginTop: 20,
        padding: 30,
    },
    avatar: {
        margin: "auto",
        backgroundColor: "#f50057",
        marginBottom: 10
    },
    // root: {
    //     color: "#006974",
    // },
    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing.unit * 3,
    //     overflowX: 'auto',
    // },
    table: {
        minWidth: '100%',
    },
    image: {
        width: 60,
        height: 80
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

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cartItem: [],
            Total: 0,
            shippngCom: false,
            address: '',
            mobileNum: null,
        }
    }

    handleDelete(e, index) {
        e.preventDefault()
        let array = [...this.state.cartItem]

        // console.log(key)
        array.splice(index, 1);
        this.setState({ cartItem: array });

        ///////////////done/////////
        // console.log("without parse", localStorage.getItem("items"))
        // let arrayLS = JSON.parse(localStorage.getItem("items"))
        // console.log("before Delete", arrayLS)

        // let afterDelete = []
        // arrayLS.map((list, index) => {
        //     let deletedItem = []
        //     if (key === list.key) {
        //         // count++
        //         deletedItem.push(list);

        //         deletedItem.splice();
        //     } else {
        //         afterDelete.push(list)
        //     }
        //     // console.log(list.key)
        // })
        // console.log("afterDele", afterDelete)

        // let item = JSON.stringify(afterDelete);
        // console.log("item", item)
        // localStorage.setItem("items", item);
        // window.location.reload();
        // this.state.setAsState
        ///////////////done/////////
    }
    handlShipping(e) {
        e.preventDefault();
        this.setState({
            shippngCom: true
        })
    }
    handlsubmit(e) {
        e.preventDefault();

        const { cartItem, address, mobileNum } = this.state

        // console.log(address, mobileNum)
        // console.log("Done", cartItem, Total)

       

        // let ref = firebase.database().ref('Cart/' + userkey);
        for (let i = 0; i < cartItem.length; i++) {
            // console.log("for", i)
            // let tot = this.state.cartItem[i].value.productPrice * this.state.cartItem[i].count
            // console.log("", tot)
            // atot.push(tot)
            let userkey = cartItem[i].value.userKey
            
            let item = cartItem[i].value
            item.qty = cartItem[i].count
            item.Total = cartItem[i].value.productPrice * cartItem[i].count

            let shippngDetail = { address, mobileNum }

            console.log(shippngDetail)
            let date = new Date();
            console.log(date.getTime())
            date = date.getTime()
            // console.log("item", item)

            // Email: "admin@gmail.com"
            // Total: 7014
            // catKey: "-LMgp1VuNW5XnIUdSmV0"
            // categoryName: "Mobiles"
            // imageURL: "https://firebasestorage.googleapis.com/v0/b/onlineshoping-0.appspot.com/o/productImages%2Fkisspng-crystal-mountain-water-cooler-bottled-water-blue-bucket-5a7e5bc5bd7552.2645095515182304697761.jpg?alt=media&token=9a6c6852-c549-44ae-a3b5-96c860d79e88"
            // key: "-LMkhCe0EvDknCCDEPXB"
            // productDescription: "qwqwewqe"
            // productName: "aqwq"
            // productPrice: "1002"
            // qty: 7
            // userKey: "lzymc40quWXW5aVNlkNQcQ61Brx1"
            // __proto__: Object

            let productKey = item.key
            let sellerEmail = item.Email
            let productName = item.productName
            let productPrice = item.productPrice
            let Quantity = item.qty
            let Total = item.Total
            let categoryName = item.categoryName

            // let user = this.props.user
            const { Email, key } = this.props.user;
            console.log("user", Email, key)
            let buyerEmail = Email
            
                    firebase.database().ref('Cart/'+key).push({
                        productKey,
                        date,
                        sellerEmail,
                        buyerEmail,
                        productName,
                        productPrice,
                        Quantity,
                        Total,
                        categoryName,
                        shippngDetail,
                    })
               
        }
        this.setState({
            cartItem: [],
            shippngCom: false,
            address: '',
            mobileNum: null
        })
        localStorage.clear("items")
        // window.location.reload()
    }
    componentWillMount() {
        // let getstate = this.props.getstate

        // this.setState({
        //     setAsState: getstate
        // })

        // console.log("ohohh", getState)

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
        this.setState({
            cartItem: compressed
        })
        // console.log(compressed)
    }
    componentDidMount() {
        console.log("componentdidMount", this.state.cartItem)
        let atot = []
        for (let i = 0; i < this.state.cartItem.length; i++) {
            // console.log("for", i)
            let tot = this.state.cartItem[i].value.productPrice * this.state.cartItem[i].count
            // console.log("", tot)
            atot.push(tot)
        }
        var sum = atot.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }
        // console.log("out", sum)
        this.setState({
            Total: sum
        })
    }
    render() {
console.log(this.state, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        const { address, mobileNum, cartItem } = this.state
        // console.log('Render', cartItem)
        const isInvalid =
            address === '' ||
            mobileNum === null;

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
                                {

                                    console.log(this.state.cartItem)
                                }
                                {
                                    this.state.cartItem && this.state.cartItem.length
                                        ?
                                        <Table style={styles.table}>
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>TotalPrice</TableCell>

                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.cartItem.map((item, index) => {
                                                        let Total = Number(item.value.productPrice) * Number(item.count)

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell component="th" scope="row">
                                                                    {item.value.productName}
                                                                </TableCell>
                                                                <TableCell>{item.value.productPrice}</TableCell>
                                                                <TableCell><img alt={item.value.productName} style={styles.image} src={item.value.imageURL} />
                                                                </TableCell>
                                                                <TableCell>{item.count}</TableCell>
                                                                <TableCell>{
                                                                    Total
                                                                }</TableCell>
                                                                <TableCell>
                                                                    <IconButton
                                                                        onClick={(e) => this.handleDelete(e, index)}

                                                                        // onClick={(e) => this.handleDelete(e, item.value.key)} 
                                                                        color="inherit" aria-label="Delete">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                }

                                                {/* <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        {
                                                            this.state.Total
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        
                                                    </TableCell>
                                                </TableRow> */}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        {/* {
                                                            this.state.Total
                                                        } */}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={(e) => this.handlShipping(e)}
                                                            // onClick={(e) => this.handlsubmit(e)} 
                                                            variant="outlined">SHIPPING DETAIL</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table> :
                                        <Typography style={{ padding: 40 }} align='center' variant="subheading">
                                            You Cart is Empty
                                        </Typography>
                                }
                            </Fragment>
                        </Grid>
                    </Grid>
                    {
                        this.state.shippngCom && this.state.cartItem && this.state.cartItem.length
                            ?
                            <Fragment>
                                <Grid container>
                                    <Grid style={styles.flex} item xs={4}>
                                    </Grid>
                                    <Grid style={styles.flex} item xs={4}>
                                        <Paper style={styles.paper1}>
                                            <Typography align="center" variant="headline">
                                                Shipping Detail
                                        </Typography>
                                            <form>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        label="Shipping address"
                                                        margin="normal"
                                                        multiline
                                                        rows="2"
                                                        onChange={event => this.setState({ address: event.target.value })}
                                                        value={this.state.address}
                                                    />
                                                    <TextField
                                                        label="Phone"
                                                        margin="normal"
                                                        type="number"
                                                        onChange={event => this.setState({ mobileNum: event.target.value })}
                                                        value={this.state.mobileNum}
                                                    />
                                                    <Button
                                                        disabled={isInvalid} onClick={(e) => this.handlsubmit(e)} variant="outlined">Submit</Button>
                                                </FormControl>
                                            </form>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Fragment>
                            : null
                    }
                </MuiThemeProvider>
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    const { user, } = state;
    // console.log("state in addCategory", state)
    return {
        user,
    };
}

export default connect(mapStateToProps,null) (Cart);

