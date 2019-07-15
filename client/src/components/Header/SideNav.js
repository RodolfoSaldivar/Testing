import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Redeem from '@material-ui/icons/Redeem';
import History from '@material-ui/icons/History';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import PersonOutline from '@material-ui/icons/PersonOutline';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';

//================================================

const useStyles = makeStyles((theme) => ({
	list: { width: 250 },
	title: { justifyContent: 'center' }
}));

//================================================

const list_items = [
	{ text: 'Home', to: '/', icon: <HomeOutlined /> },
	{ text: 'Users', to: '/users', icon: <PersonOutline /> },
	{ text: 'Groups', to: '/groups', icon: <GroupOutlined /> },
	{ text: 'Rewards', to: '/rewards', icon: <Redeem /> },
	{ text: 'Requests', to: '/requests', icon: <ShoppingCartOutlined /> },
	{ text: 'History', to: '/history', icon: <History /> },
	{ text: 'Permissions', to: '/permissions', icon: <FormatListBulleted /> },
	{ text: 'Schedules', to: '/schedules', icon: <TodayOutlined /> }
];

//================================================

const SideNav = ({ navOpen, toggleDrawer }) => {
	const classes = useStyles();

	return (
		<SwipeableDrawer
			open={navOpen}
			onOpen={toggleDrawer(true)}
			onClose={toggleDrawer(false)}
		>
			<Toolbar className={classes.title}>
				<Typography variant="h5">Testing</Typography>
			</Toolbar>
			<Divider />
			<List className={classes.list} onClick={toggleDrawer(false)}>
				{list_items.map(({ text, icon, to }) => (
					<ListItem button key={text} component={Link} to={to}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</SwipeableDrawer>
	);
};

export default SideNav;
