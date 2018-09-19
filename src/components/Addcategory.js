import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
// import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux'

const styles = {
    dialogWidth: {
        width: 400
    }
}

class Addcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: '',
            categoryName: '',
            description:''
        }
    }
    
    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }
    addCategory() {
        console.log("this.state", this.state);
        const { categoryName, description } = this.state;
        const { Email, key } = this.props.user;
        // console.log(Email, key)
        let userKey = key;

        firebase.database().ref('Category').push({
            Email,
            categoryName,
            description,
            userKey,
        }).then(
            this.handletoggle(),
            this.setState({
                categoryName: '',
            })
        )
            .catch(
                error => {
                    this.setState({ error })
                })
    }

    render() {
        const { open, categoryName, description } = this.state;
        // console.log("render Addcategory : ", this.props.user)
        const isInvalid =
            categoryName === ''||
            description==='';
        // console.log("render Addparking : ", this.props.user)
        return (
            <Fragment>
                <Button variant="outlined" onClick={() => this.handletoggle()}>Add Category</Button>
                <Dialog
                    open={open}
                    onClose={this.handletoggle}
                >
                    <DialogTitle >
                        <Typography align="center"
                            variant="headline"
                            component="p"
                            color="primary">
                            Category
                        </Typography>
                    </DialogTitle>
                    <DialogContent style={styles.dialogWidth}>
                        <form >
                            <FormControl fullWidth >
                                <TextField
                                    label="Category Name"
                                    margin="normal"
                                    onChange={event => this.setState({ categoryName: event.target.value })}
                                    value={this.state.categoryName}
                                /><br />
                                <TextField
                                    label="Discription"
                                    margin="normal"
                                    multiline
                                    rows="3"
                                    inputProps={{maxLength:25}}
                                    onChange={event => this.setState({ description: event.target.value })}
                                    value={this.state.description}
                                /><br />
                                <Typography align="center" component="p" variant="subheading" color="error">
                                    {/* {this.state.error} */}
                                </Typography>
                                <br />
                                <Button
                                    disabled={isInvalid}
                                    color="primary"
                                    variant="raised"
                                    onClick={() => this.addCategory()}
                                >
                                    Add Parking
                                </Button>
                            </FormControl>
                        </form>
                    </DialogContent>
                </Dialog>
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
export default connect(mapStateToProps, null)(Addcategory);

