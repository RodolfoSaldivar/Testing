import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {
   AppBar,
   Button,
   Toolbar,
   IconButton,
   Typography
} from '@material-ui/core';

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
               <Typography variant="h6" className={classes.title}>
                  Title
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <SideNav navOpen={navOpen} toggleDrawer={toggleDrawer} />
      </div>
   );
};

export default Header;
