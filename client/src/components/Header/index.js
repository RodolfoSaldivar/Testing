import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SideNav from './SideNav';

//================================================

const useStyles = makeStyles((theme) => ({
   root: { flexGrow: 1, marginBottom: theme.spacing(2) },
   menuButton: { marginRight: theme.spacing(2) },
   title: { flexGrow: 1 }
}));

//================================================

const Header = () => {
   const classes = useStyles();
   const [navOpen, setNavOpen] = useState(false);

   const toggleDrawer = (value) => (event) => setNavOpen(value);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={toggleDrawer(true)}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h5" className={classes.title}>
                  Testing
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <SideNav navOpen={navOpen} toggleDrawer={toggleDrawer} />
      </div>
   );
};

export default Header;
