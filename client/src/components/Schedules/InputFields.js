import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';

import * as types from '../../types/schedulesTypes';
import * as schedulesActions from '../../actions/schedulesActions';

//================================================

const inText = { margin: '5px 5px 0px 5px' };
const useStyles = makeStyles((theme) => ({
	divs: { marginRight: 5 },
	center: theme.absoluteCenter,
	cicleInput: { ...inText, width: 80 },
	pointsInput: { ...inText, width: 50 },
	descriptionInput: { ...inText, width: 200 },
	multipleSelect: { ...inText, maxWidth: '90%', textAlign: 'center' }
}));

//================================================

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

const day_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
day_numbers.push(11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
day_numbers.push(21, 22, 23, 24, 25, 26, 27, 28);

//================================================

const InputFields = (props) => {
	const { save_form, changeInputFields } = props;
	const [toastOpen, setToastOpen] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		save_form.missing && setToastOpen(true);
	}, [save_form.missing]);

	const inputsChange = (ACTION) => (event) => {
		changeInputFields(ACTION, event.target.value);
	};

	const pointsChange = (event) => {
		const { value } = event.target;
		//================================================
		//----> validate min max
		changeInputFields(types.FORM_POINTS, parseInt(value));
	};

	const closeToast = (e, reason) => {
		if (reason === 'clickaway') return;
		setToastOpen(false);
	};

	//================================================

	return (
		<Grid container>
			<div className={classes.divs}>
				Schedule called
				<Input
					// error
					defaultValue={save_form.description}
					className={classes.descriptionInput}
					onChange={inputsChange(types.FORM_DESCRIPTION)}
				/>
			</div>

			{/*//================================================*/}

			<div className={`input_center ${classes.divs}`}>
				will give members
				<Input
					type="number"
					defaultValue={save_form.points}
					className={classes.pointsInput}
					onChange={pointsChange}
				/>
				points
			</div>

			{/*//================================================*/}

			{save_form.cicle === 'W' && (
				<div className={classes.divs}>
					every
					<Select
						multiple
						value={save_form.week_days}
						className={classes.multipleSelect}
						onChange={inputsChange(types.FORM_WEEK_DAYS)}
						renderValue={(selected) => selected.join(', ')}
					>
						{days.map((day) => (
							<MenuItem key={day} value={day}>
								<Checkbox
									checked={save_form.week_days.indexOf(day) > -1}
								/>
								<ListItemText primary={day} />
							</MenuItem>
						))}
					</Select>
				</div>
			)}

			{/*//================================================*/}

			{save_form.cicle === 'M' && (
				<div className={classes.divs}>
					every
					<Select
						multiple
						value={save_form.month_days}
						className={classes.multipleSelect}
						onChange={inputsChange(types.FORM_MONTH_DAYS)}
						renderValue={(selected) => selected.join(', ')}
					>
						{day_numbers.map((day) => (
							<MenuItem key={day} value={day}>
								<Checkbox
									checked={save_form.month_days.indexOf(day) > -1}
								/>
								<ListItemText primary={day} />
							</MenuItem>
						))}
					</Select>
				</div>
			)}

			{/*//================================================*/}

			<div className={classes.divs}>
				{save_form.cicle === 'D' ? 'every' : 'of the'}
				<Select
					value={save_form.cicle}
					className={classes.cicleInput}
					onChange={inputsChange(types.FORM_CICLE)}
				>
					<MenuItem value={'D'}>Day</MenuItem>
					<MenuItem value={'W'}>Week</MenuItem>
					<MenuItem value={'M'}>Month</MenuItem>
				</Select>
			</div>

			{/*//================================================*/}

			<Snackbar
				open={toastOpen}
				onClose={closeToast}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				message={
					<Typography variant="h6">Schedule fields missing.</Typography>
				}
			/>
		</Grid>
	);
};

const mapStateToProps = ({ schedulesReducer }) => schedulesReducer;

export default connect(
	mapStateToProps,
	schedulesActions
)(InputFields);
