import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
// import { firebaseApp } from '../firebase'
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        paddingTop: 30,
        marginLeft: '50%',
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
    buttonProgress: {
        color: "#00bcd4",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
};

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            value: '',
            seletctedFile: null,
            imageURL: null,
            loading: false,
            success: false,
            error: {
                message: ''
            }
        }
    }
    pushData() {
        // console.log("pushData")
        const { value, userName, email, password, imageURL, 
            // error
         } = this.state

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // console.log("auth then")
                firebase.database().ref().child("user/" + firebase.auth().currentUser.uid).set({
                    Email: email,
                    Password: password,
                    Username: userName,
                    key: firebase.auth().currentUser.uid,
                    profilePic: imageURL,
                    userType: value
                }).then(
                    // console.log("then")
                )
                    .catch(error => {
                        this.setState({ error })
                    })
            }).catch(error => {
                // console.log(error)
                this.setState({ error })
            })
    }
    signUp() {
        let fileName = this.state.seletctedFile.name;
        // console.log("fileName", fileName);

        const storageRef = firebase.storage().ref("/profileImages/" + fileName);
        if (!this.state.imageURL) {
            this.setState({
                success: false,
                loading: true,
            },
                () => {
                    storageRef.put(this.state.seletctedFile)
                        .then((snapshot) => {
                            let download = storageRef.getDownloadURL()
                            // console.log("snaps", download)

                            setTimeout(() => {
                                // console.log("setTimeOut", download.i)
                                this.setState({
                                    imageURL: download.i,
                                    loading: false,
                                    success: true,
                                })
                                this.pushData()
                            }, 5000)
                        }).catch(error => {
                            // console.log(error)
                            this.setState({ error })
                        })
                }
            )
        }
    }

    render() {
        const { value, userName, email, password, seletctedFile, loading, } = this.state

        const isInvalid =
            userName === '' || email === '' ||
            password === '' || value === '' || seletctedFile === null;

        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Grid container>
                        <Grid style={styles.flex} item xs={8}>
                            <Paper style={styles.paper} >
                                <Avatar style={styles.avatar} >
                                    <LockIcon />
                                </Avatar>
                                <Typography align="center" variant="headline">Sign up</Typography>
                                <form >
                                    <FormControl fullWidth >
                                        <TextField
                                            label="User Name"
                                            margin="normal"
                                            onChange={event => this.setState({ userName: event.target.value })}
                                        /><br />
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            onChange={event => this.setState({ email: event.target.value })}
                                        /><br />

                                        <TextField
                                            label="Password"
                                            margin="normal"
                                            onChange={event => this.setState({ password: event.target.value })}
                                            type="password"
                                        />
                                        <br />
                                        <Typography variant="caption" >
                                            Profile Image :
                                            <Input fullWidth type="file"
                                                onChange={event => this.setState({ seletctedFile: event.target.files[0] })}
                                                accept="image/*" />
                                            {/* <Button style={{ marginTop: 10, float: "Right" }} color="primary" variant="contained">upload
                                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                            </Button> */}
                                        </Typography>
                                        <br />
                                        <RadioGroup
                                            value={this.state.value}
                                            onChange={event => this.setState({ value: event.target.value })}
                                        >
                                            <FormControlLabel value="Seller" name="user"
                                                control={<Radio
                                                // style={
                                                //     styles.root
                                                // }
                                                />} label="Seller" />
                                            <FormControlLabel value="Buyer" name="user"
                                                control={<Radio
                                                // style={
                                                //     styles.root
                                                // }
                                                />}
                                                label="Buyer" />
                                        </RadioGroup>
                                        <br />
                                        <Button
                                            disabled={isInvalid || loading}
                                            // type="submit"
                                            color="primary"
                                            variant="raised"
                                            onClick={() => this.signUp()}
                                        >Sign Up
                                        {loading && <CircularProgress size={24} style={styles.buttonProgress} />}
                                        </Button>
                                        <br />
                                    </FormControl>
                                    {
                                        <Typography align="center" color="error" >
                                            {
                                                this.state.error.message
                                            }
                                        </Typography>
                                    }

                                    <div>Already a user?<Link to={'/signin'} > Sign In </Link> </div>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}
export default Signup;

