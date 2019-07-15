import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import Table from './Table';
import ModalSave from './ModalSave';
import * as usersActions from '../../actions/usersActions';

//================================================

const useStyles = makeStyles((theme) => ({
	marginLeft: { marginLeft: theme.spacing(2) },
	tableWrapper: {
		overflowX: 'auto',
		margin: theme.spacing(2)
	}
}));

//================================================

const Users = (props) => {
	const classes = useStyles();

	useEffect(() => {
		if (props.loading) return;
		if (props.error) return;
		if (_.isEmpty(props.users)) props.getAll();
	}, [props]);

	return (
		<div>
			<Paper elevation={5}>
				{/*//================================================*/}

				<Toolbar>
					<Typography variant="h5">Users</Typography>
					<div className={classes.marginLeft}>
						<ModalSave>
							<Fab size="small" color="secondary" aria-label="Add">
								<AddIcon />
							</Fab>
						</ModalSave>
					</div>
				</Toolbar>

				{/*//================================================*/}

				<div className={classes.tableWrapper}>
					<Table
						rows={props.users}
						headRows={[
							{ id: 'name', label: 'Name', align: 'left' },
							{ id: 'lastname', label: 'Lastname', align: 'left' },
							{ id: 'mail', label: 'Mail', align: 'left' },
							{ id: 'status', label: 'Status', align: 'left' }
						]}
					/>
				</div>

				{/*//================================================*/}
			</Paper>
			<br />
		</div>
	);
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

export default connect(
	mapStateToProps,
	usersActions
)(Users);
