import React from 'react';
// import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

//================================================

const inText = { margin: '5px 5px 0px 5px' };
const useStyles = makeStyles((theme) => ({
	center: theme.absoluteCenter,
	pointsInput: { ...inText, width: 60 },
	cicleInput: { ...inText, width: 100, textAlign: 'center' },
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

const InputFields = () => {
	const classes = useStyles();
	const [cicle, setCicle] = React.useState('D');
	const [weekDays, setWeekDays] = React.useState([]);
	const [monthDays, setMonthDays] = React.useState([]);

	/*
		falta hacer el schedule actions y reducer con:
		points, cicle, weekDays y monthDays
	*/

	const changeCicle = (event) => {
		setCicle(event.target.value);
	};

	const changeWeekDays = (event) => {
		setWeekDays(event.target.value);
	};

	const changeMonthDays = (event) => {
		setMonthDays(event.target.value);
	};

	return (
		<Grid container className={`${classes.center} input_center`}>
			<Grid item xs={12} className={classes.center}>
				Give members
				<Input
					defaultValue=""
					className={classes.pointsInput}
					type="number"
				/>
				points
			</Grid>

			{/*//================================================*/}

			{cicle === 'W' && (
				<Grid item xs={12} className={classes.center}>
					every
					<Select
						multiple
						value={weekDays}
						onChange={changeWeekDays}
						className={classes.multipleSelect}
						renderValue={(selected) => selected.join(', ')}
					>
						{days.map((day) => (
							<MenuItem key={day} value={day}>
								<Checkbox checked={weekDays.indexOf(day) > -1} />
								<ListItemText primary={day} />
							</MenuItem>
						))}
					</Select>
				</Grid>
			)}

			{/*//================================================*/}

			{cicle === 'M' && (
				<Grid item xs={12} className={classes.center}>
					every
					<Select
						multiple
						value={monthDays}
						onChange={changeMonthDays}
						className={classes.multipleSelect}
						renderValue={(selected) => selected.join(', ')}
					>
						{day_numbers.map((day) => (
							<MenuItem key={day} value={day}>
								<Checkbox checked={monthDays.indexOf(day) > -1} />
								<ListItemText primary={day} />
							</MenuItem>
						))}
					</Select>
				</Grid>
			)}

			{/*//================================================*/}

			<Grid item xs={12} className={classes.center}>
				{cicle === 'D' ? 'every' : 'of the'}
				<Select
					value={cicle}
					onChange={changeCicle}
					className={classes.cicleInput}
				>
					<MenuItem value={'D'}>Day</MenuItem>
					<MenuItem value={'W'}>Week</MenuItem>
					<MenuItem value={'M'}>Month</MenuItem>
				</Select>
			</Grid>
		</Grid>
	);
};

export default InputFields;
