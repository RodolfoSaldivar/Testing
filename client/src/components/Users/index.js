import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import Typography from '@material-ui/core/Typography';
import Table from '../Table';
import * as usersActions from '../../actions/usersActions';

const Users = (props) => {
	useEffect(() => {
		if (props.loading) return;
		if (props.error) return;
		if (!props.users.length) {
			props.getAll();
		}
	}, [props]);

	return (
		<div>
			<Table
				title="Users"
				rows={props.users}
				headRows={[
					{ id: 'username', label: 'Username', align: 'left' },
					{ id: 'name', label: 'Name', align: 'left' },
					{ id: 'lastname', label: 'Lastname', align: 'left' },
					{ id: 'mail', label: 'Mail', align: 'left' },
					{ id: 'age', label: 'Age', align: 'right' }
				]}
			/>
		</div>
	);
};

const mapStateToProps = (reducers) => {
	return reducers.usersReducer;
};

export default connect(
	mapStateToProps,
	usersActions
)(Users);
