import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import AttachFile from '@material-ui/icons/AttachFile';

import * as types from '../../types/usersTypes';
import * as usersActions from '../../actions/usersActions';

//================================================

const useStyles = makeStyles((theme) => ({
	chip: { margin: 2 },
	bigAvatar: theme.bigAvatar,
	center: theme.absoluteCenter,
	button: { marginRight: theme.spacing(2) },
	chips: { display: 'flex', flexWrap: 'wrap' },
	createNewGroup: { color: theme.palette.secondary.dark }
}));

//================================================

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder'
];

//================================================

const InputFields = (props) => {
	const {
		save_form,
		setIsDisabled,
		setGroupFormOpen,
		changeInputFields
	} = props;
	const [groupSelectOpen, setGroupSelectOpen] = useState(false);
	const classes = useStyles();

	const openGroupSelect = () => setGroupSelectOpen(true);
	const closeGroupSelect = () => setGroupSelectOpen(false);

	const inputsChange = (ACTION) => (event) => {
		closeGroupSelect();
		const { value } = event.target;
		if (_.last(value) < 0) {
			// Inside "New Group" option, if exists in list
			setGroupFormOpen && setGroupFormOpen(true);
			setIsDisabled && setIsDisabled(true);
			return;
		}
		changeInputFields(ACTION, value);
	};

	//================================================

	return (
		<Grid container spacing={3} className={classes.center}>
			<Grid item xs={12} sm={6} className={classes.center}>
				<Avatar src="" className={classes.bigAvatar} />
			</Grid>

			<Grid item xs={12} sm={6} className={classes.center}>
				<input
					hidden
					type="file"
					accept="image/*"
					id="user_form_image"
					onChange={(e) => console.log(e.target.value.split('\\')[2])}
				/>
				<label htmlFor="user_form_image">
					<Fab
						size="small"
						component="span"
						color="secondary"
						aria-label="Attach"
						className={classes.button}
					>
						<AttachFile />
					</Fab>
				</label>
				<TextField disabled fullWidth label="Image" onChange={(e) => 123} />
			</Grid>

			{/*//================================================*/}

			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					label="Name"
					value={save_form.name}
					onChange={inputsChange(types.FORM_NAME)}
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					label="Lastname"
					value={save_form.lastname}
					onChange={inputsChange(types.FORM_LASTNAME)}
				/>
			</Grid>

			{/*//================================================*/}

			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					label="Mail"
					value={save_form.mail}
					onChange={inputsChange(types.FORM_MAIL)}
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<TextField
					fullWidth
					label="Password"
					value={save_form.password}
					onChange={inputsChange(types.FORM_PASSWORD)}
				/>
			</Grid>

			{/*//================================================*/}

			<Grid item xs={12}>
				<FormControl fullWidth>
					<InputLabel htmlFor="select_chip">Group</InputLabel>
					<Select
						multiple
						open={groupSelectOpen}
						value={save_form.groups}
						onOpen={openGroupSelect}
						onClose={closeGroupSelect}
						onChange={inputsChange(types.FORM_GROUPS)}
						input={<Input id="select_chip" />}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.map((value) => (
									<Chip
										key={value}
										label={names[value]}
										className={classes.chip}
									/>
								))}
							</div>
						)}
					>
						<MenuItem
							color="primary"
							value={-1}
							className={classes.createNewGroup}
						>
							New Group
						</MenuItem>
						{names.map((name, index) => (
							<MenuItem key={index} value={index}>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = ({ usersReducer }) => usersReducer;

export default connect(
	mapStateToProps,
	usersActions
)(InputFields);
