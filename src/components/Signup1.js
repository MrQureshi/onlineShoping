import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import LockIcon from '@material-ui/icons/LockOutlined';
// import FolderIcon from '@material-ui/icons/Folder';
// import UploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import firebase from 'firebase';
// import { firebaseApp } from '../firebase'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#00bcd4' }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    custButton: {
        color: "white",
        backgroundColor: '#00bcd4',
        '&:hover': {
            backgroundColor: "#006974",
        },
    },
    root: {
        color: "#00bcd4",
        '&$checked': {
            color: "#006974",
        },
    },
    checked: {},
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        // backgroundColor: "#00bcd4",
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: "#00bcd4",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class SignIn extends Component {
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
            error: ''
        }
    }
    fileSelectHandler = event => {
        // console.log(event.target.files[0])
        this.setState({
            seletctedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        // console.log("this.state.seletctedFile", this.state.seletctedFile.name);

        let fileName = this.state.seletctedFile.name;
        console.log("fileName", fileName)
        const storageRef = firebase.storage().ref("/imagesRes/" + fileName);
        if (!this.state.imageURL) {
            this.setState({
                success: false,
                loading: true,
            },
                () => {

                    storageRef.put(this.state.seletctedFile)
                        .then((snapshot) => {

                            let download = storageRef.getDownloadURL()
                            console.log("snaps", download)

                            setTimeout(() => {
                                console.log("stim", download.i)
                                this.setState({
                                    imageURL: download.i,
                                    loading: false,
                                    success: true,
                                })
                            }, 5000);
                        })
                }
            )
        }
    }
    Signin() {
        const { value, userName, email, password, imageURL, seletctedFile } = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                firebase.database().ref().child("user" + "/" + firebase.auth().currentUser.uid).set({
                    Email: email,
                    Password: password,
                    Username: userName,
                    key: firebase.auth().currentUser.uid,
                    profilePic: imageURL,
                    userType: value
                })
                    .catch(error => {
                        this.setState({ error })
                    })
            }).catch(error => {
                this.setState({ error })
            })
    }
    render() {
        const { classes } = this.props
        const { value, userName, email, password, imageURL, seletctedFile, loading, success } = this.state
        console.log("render imageURL", imageURL)

        const isInvalid =
            userName === '' ||
            email === '' ||
            password === '' ||
            value === '';

        const uploadIsInValid =
            seletctedFile === null;
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockIcon />
                            </Avatar>
                            <Typography variant="headline">Sign up</Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        label="User Name"
                                        margin="normal"
                                        autoFocus
                                        onChange={event => this.setState({ userName: event.target.value })}
                                    />
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        onChange={event => this.setState({ email: event.target.value })}
                                    />
                                    <TextField
                                        label="Password"
                                        margin="normal"
                                        onChange={event => this.setState({ password: event.target.value })}
                                        type="password"
                                    /><br />
                                    <Typography variant="caption" >
                                        Profile Image :
                                            <Input fullWidth type="file" onChange={this.fileSelectHandler} accept="image/*" />
                                        {success ? <Typography style={{ marginTop: 10, float: "left" }} >image uploaded</Typography> : null}

                                        <Button disabled={uploadIsInValid || loading} onClick={this.fileUploadHandler} className={classes.custButton} style={{ marginTop: 10, float: "Right" }} variant="contained">upload
                                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </Button>
                                    </Typography>
                                    <br />
                                    <RadioGroup
                                        value={this.state.value}
                                        onChange={event => this.setState({ value: event.target.value })}
                                    >
                                        <FormControlLabel value="Seller" name="user"
                                            control={<Radio
                                                // className={classes.custRadionButton}
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }}
                                            />} label="Seller" />
                                        <FormControlLabel value="Buyer" name="user"
                                            control={<Radio
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />}
                                            label="Buyer" />
                                    </RadioGroup>
                                    <Button
                                        disabled={isInvalid}
                                        // type="submit"
                                        // fullWidth
                                        variant="raised"
                                        onClick={() => this.Signin()}
                                        // color="primary"
                                        className={classes.custButton}
                                    >
                                        Sign up
                                    </Button>
                                </FormControl>
                                <Typography component="p">
                                    {
                                        this.state.error
                                    }
                                </Typography>
                            </form>
                            <br />
                            <Typography>
                                Already a user ? <Link to={'/signin'} > Sign In </Link>
                            </Typography>
                        </Paper>
                    </main>
                </MuiThemeProvider>
            </Fragment >
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);