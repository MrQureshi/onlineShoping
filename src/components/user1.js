import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  appBar: {
      position: 'relative',
  },
  flex: {
      flex: 1,
  },
  pos: {
      marginTop: 12,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handletoggle = () => {
    this.setState({
      open: !this.state.open,
    })

    // console.log("open", this.state.open)
  }
  render() {

    // const drawer = (
    //   <Drawer
    //     variant="persistent"
    //     anchor={anchor}
    //     open={open}
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >
    //     <div className={classes.drawerHeader}>
    //       <IconButton onClick={this.handleDrawerClose}>
    //         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    //       </IconButton>
    //     </div>
    //     <Divider />
    //     <List>{mailFolderListItems}</List>
    //     <Divider />
    //     <List>{otherMailFolderListItems}</List>
    //   </Drawer>
    // );

    return (
      <Fragment>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.handletoggle} color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}
// export default Signup;
export default App;
