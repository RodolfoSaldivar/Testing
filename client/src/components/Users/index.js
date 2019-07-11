import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Table from '../Table';
import * as usersActions from '../../actions/usersActions';

const Users = (props) => {
	useEffect(() => {
		if (props.loading) return;
		if (props.error) return;
		if (_.isEmpty(props.users)) {
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

const mapStateToProps = ({ usersReducer }) => usersReducer;

export default connect(
	mapStateToProps,
	usersActions
)(Users);
