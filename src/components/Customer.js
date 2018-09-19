
import React, { Component, Fragment } from 'react';
// import { Typography } from '@material-ui/core';
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
        padding: 20,
        // paddingTop: 30,
        width:'100%',
        // marginLeft: '50%',
        marginTop: 10,
        // marginBottom: 10,
        // height: 350,
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
                    <Grid container>
                        <Grid style={styles.flex} item xs={12}>
                            <Paper style={styles.paper} >
                              <h1>Cutomer</h1>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default Order;

