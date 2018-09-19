import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';
// import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            productName: '',
            productPrice: '',
            productDescription: '',
            selectedCategory: '',
            seletctedFile: '',
            loading: false,
            success: false,
            imageURL: null,
            // error: {
            //     message: ''
            // }
        }
    }

    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })

        let selectedCategory = this.props.addProductProps

        // console.log("selectedCategory", selectedCategory);

        this.setState({
            selectedCategory
        })
    }
    pushData() {
        console.log("this.state", this.state);
        const {productName, productPrice, productDescription, imageURL, selectedCategory} = this.state;
        const { Email, key } = this.props.user;
        // console.log(Email, key)

        // Email: "admin@gmail.com"
        // categoryName: "Mobiles"
        // description: "↵every brand"
        // key: "-LMgp1VuNW5XnIUdSmV0"
        // userKey: "lzymc40quWXW5aVNlkNQcQ61Brx1"
        let catKey = selectedCategory.key
        let categoryName = selectedCategory.categoryName
        let userKey = key

        firebase.database().ref('Product/'+catKey).push({
            Email,
            categoryName,
            catKey,
            productName,
            productPrice, 
            productDescription, 
            imageURL,
            userKey,
        }).then(
            console.log("Succ"),
            this.handletoggle(),
            this.setState({
                categoryName:'',
            })
        )
            .catch(
                error => {
                    this.setState({ error })
                })
    }
    addProduct() {
        let fileName = this.state.seletctedFile.name;

        const storageRef = firebase.storage().ref("/productImages/" + fileName);
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
                                console.log("setTimeOut", download.i)
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
        const { open, productName, productPrice, productDescription, seletctedFile,loading } = this.state;
        // console.log("render", selectedCategory)
        // console.log("render Addcategory : ", this.props.user)
        const isInvalid =
            productName === '' ||
            productPrice === '' ||
            productDescription === '' ||
            seletctedFile === '';
        // console.log("render Addparking : ", this.props.user)
        return (
            <Fragment>
                <IconButton variant="outlined" onClick={() => this.handletoggle()}>
                    <AddIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={this.handletoggle}
                >
                    <DialogTitle >
                        <Typography align="center"
                            variant="headline"
                            component="p"
                            color="primary">
                            Add Product
                        </Typography>
                    </DialogTitle>
                    <DialogContent style={styles.dialogWidth}>
                        <form >
                            <FormControl fullWidth >
                                <TextField
                                    label="Name"
                                    margin="normal"
                                    onChange={event => this.setState({ productName: event.target.value })}
                                    value={this.state.productName}
                                /><br />
                                <TextField
                                    label="Price"
                                    margin="normal"
                                    type="number"
                                    onChange={event => this.setState({ productPrice: event.target.value })}
                                    value={this.state.productPrice}
                                /><br />
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
                                <TextField
                                    label="Discription"
                                    margin="normal"
                                    multiline
                                    rows="3"
                                    onChange={event => this.setState({ productDescription: event.target.value })}
                                    value={this.state.productDescription}
                                /><br />
                                <Typography align="center" component="p" variant="subheading" color="error">
                                    {this.state.error}
                                </Typography>
                                <br />
                                <Button
                                    disabled={isInvalid}
                                    color="primary"
                                    variant="raised"
                                    onClick={() => this.addProduct()}
                                >
                                    Add
                                    {loading && <CircularProgress size={24} style={styles.buttonProgress} />}

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
    // console.log("state in addProduct", state)
    return {
        user,
    };
}
export default connect(mapStateToProps, null)(Addcategory);

