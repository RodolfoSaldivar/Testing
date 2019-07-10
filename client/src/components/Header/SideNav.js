import React from 'react';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles } from '@material-ui/core/styles';
import {
	List,
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';

//================================================

const useStyles = makeStyles((theme) => ({
	list: { width: 250 }
}));

//================================================

const SideNav = ({ navOpen, toggleDrawer }) => {
	const classes = useStyles();

	return (
		<Drawer open={navOpen} onClose={toggleDrawer(false)}>
			<List className={classes.list} onClick={toggleDrawer(false)}>
				<ListItem button component={Link} to="/">
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>

				<ListItem button component={Link} to="/other">
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="Other" />
				</ListItem>
			</List>
		</Drawer>
	);
};

export default SideNav;
