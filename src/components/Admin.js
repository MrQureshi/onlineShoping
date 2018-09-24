import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { firebaseApp } from '../firebase';

import DashboardCom from './dashboard'
import Purchased from './purchasedAdmin'

//
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import { Link } from 'react-router-dom';

////
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
});

class Dashboard extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        dashboard: true,
    
        purchased: false,
        // numberOfItems: 0
    };
    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    signOut() {
        firebaseApp.auth().signOut();
        localStorage.clear("items")
    }
    handleDashboard() {
        this.setState(
            {
                dashboard: true,
                
                purchased: false
            }
        )
    }
    
    handlePurchased() {
        this.setState(
            {
                dashboard: false,
               
                purchased: true
            }
        )
    }
    // componentDidMount() {
    //     let array = JSON.parse(localStorage.getItem('items'))
    //     let original = [];

    //     array ? array.map((list, index) => {

    //         let tmpStr = JSON.stringify(list)
    //         var newStr = tmpStr.substring(1, tmpStr.length - 1);

    //         return (original.push(newStr))

    //     }) : null
    //     var compressed = [];

    //     var copy = original.slice(0);

    //     for (var i = 0; i < original.length; i++) {
    //         var myCount = 0;

    //         for (var w = 0; w < copy.length; w++) {
    //             if (original[i] === copy[w]) {
    //                 // increase amount of times duplicate is found
    //                 myCount++;
    //                 // sets item to undefined
    //                 delete copy[w];
    //             }
    //         }
    //         if (myCount > 0) {
    //             var a = {}

    //             var b = {};

    //             b.obj = original[i];
    //             let inString = b
    //             let getObj

    //             for (let key in inString) {
    //                 // console.log("for", b[key])
    //                 let mystring = inString[key]
    //                 mystring = ('{' + mystring + '}')
    //                 // console.log("mysttt", mystring)
    //                 let prs = JSON.parse(mystring);
    //                 // console.log("perse", prs)

    //                 getObj = prs
    //             }
    //             a.value = getObj;
    //             a.count = myCount;
    //             compressed.push(a);
    //         }
    //     }
    //     this.setState({
    //         numberOfItems: compressed.length
    //     })
    // }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state
        // console.log("render mnmn", numberOfItems)
        const open = Boolean(anchorEl);
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handletoggle}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography variant="title" color="inherit" noWrap className={classes.title}>
                                Admin
              </Typography>
                            {/* <IconButton onClick={() => this.handleCarts()} color="inherit">
                                <Badge badgeContent={this.state.numberOfItems ? this.state.numberOfItems : 0} color="secondary">
                                    <NotificationsIcon /> */}
                            {/* </Badge> */}
                            {/* </IconButton> */}
                            {/* <IconButton
                className={classes.bigAvatar} color="inherit" aria-haspopup="true" onClick={this.handleMenu} >
                <Avatar className={classes.bigAvatar} /> */}
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle
                                    className={classes.bigAvatar}
                                />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={() => this.signOut()}>Sign out</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handletoggle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            
                                <ListItem button onClick={() => this.handleDashboard()}>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                           
                           

                                

                           
                            <ListItem button onClick={() => this.handlePurchased()}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Purchased" />
                            </ListItem>
                            {/* <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" /> */}
                            {/* </ListIte m> */}
                        </List>
                        {/* <Divider /> */}
                        {/* <List>{secondaryListItems}</List> */}
                    </Drawer>
                    <main className={classes.content}>
                    
                        <div className={classes.appBarSpacer} />
                        
                        {this.state.dashboard ?
                            <DashboardCom />
                            : null
                        }
                        
                        {this.state.purchased ?
                            <Purchased />
                            : null
                        }
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);