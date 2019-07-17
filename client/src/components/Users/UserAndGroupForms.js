import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import UserInputFields from './InputFields';
import GroupInputFields from '../Groups/InputFields';
import ScheduleInputFields from '../Schedules/InputFields';

import * as groupsActions from '../../actions/groupsActions';

const { createWithSchedule: createGroupWithSchedule } = groupsActions;

//================================================

const useStyles = makeStyles((theme) => ({
	groupForm: theme.absoluteCenter,
	marginRight: { marginRight: theme.spacing(5) },
	groupFormButtons: { display: 'flex', justifyContent: 'flex-end' }
}));

//================================================

const Form = (props) => {
	const { setIsDisabled, createGroupWithSchedule } = props;
	const [groupFormOpen, setGroupFormOpen] = useState(true);
	const classes = useStyles();

	const closeGroupForm = () => {
		//================================================
		// limpiar la forma del grupo
		//================================================
		setIsDisabled(false);
		setGroupFormOpen(false);
	};

	//================================================

	return (
		<div>
			<Collapse in={!groupFormOpen}>
				<UserInputFields
					setIsDisabled={setIsDisabled}
					setGroupFormOpen={setGroupFormOpen}
				/>
			</Collapse>

			{/*//================================================*/}

			<Collapse in={groupFormOpen}>
				<Grid container spacing={3} className={classes.groupForm}>
					<Grid item xs={12}>
						<Typography variant="h6">New Group</Typography>
					</Grid>

					<Grid item xs={12}>
						<GroupInputFields />
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h6">Default Schedule</Typography>
					</Grid>

					<Grid item xs={12}>
						<ScheduleInputFields />
						<br />
					</Grid>

					<Grid item xs={12} className={classes.groupFormButtons}>
						<Button
							variant="contained"
							color="secondary"
							className={classes.marginRight}
							onClick={() => createGroupWithSchedule()}
						>
							Save Group
						</Button>
						<Button onClick={closeGroupForm} variant="outlined">
							Close Group
						</Button>
					</Grid>
				</Grid>
			</Collapse>
		</div>
	);
};

export default connect(
	() => ({}),
	{ createGroupWithSchedule }
)(Form);
