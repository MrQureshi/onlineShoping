import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
// import { firebaseApp } from '../firebase'
// import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseApp } from '../firebase'

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

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    console.log('this.state', this.state)
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const {email, password,} = this.state

    const isInvalid = email=== ''|| password=== '';
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
                      label="Email"
                      margin="normal"
                      onChange={event => this.setState({ email: event.target.value })}
                    /><br />
                    <TextField
                      label="Password"
                      margin="normal"
                      onChange={event => this.setState({ password: event.target.value })}
                      type="password"
                    /><br />
                    <Button
                      // type="submit"
                      disabled={isInvalid}
                      color="primary"
                      variant="raised"
                      onClick={() => this.signIn()} >Sign In</Button>
                    <br />
                  </FormControl>
                  {<p>{this.state.error.message}</p>}
                  <div><Link to={'/signup'} >Sign Up</Link> </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

export default Signin;
