import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import AttachFile from '@material-ui/icons/AttachFile';

import * as types from '../../types/groupsTypes';
import * as groupsActions from '../../actions/groupsActions';

//================================================

const useStyles = makeStyles((theme) => ({
	bigAvatar: theme.bigAvatar,
	center: theme.absoluteCenter,
	button: { marginRight: theme.spacing(2) }
}));

//================================================

const InputFields = (props) => {
	const { save_form, changeInputFields } = props;
	const classes = useStyles();

	const inputsChange = (ACTION) => (event) => {
		const { value } = event.target;
		changeInputFields(ACTION, value);
	};

	const imageChange = () => (event) => {
		const [image] = event.target.files;

		//================================================
		// if (image.size > ) no dejar subir
		//================================================

		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = () => {
			changeInputFields(types.FORM_IMAGE, image);
			changeInputFields(types.FORM_IMG_PREVIEW, reader.result);
		};
	};

	//================================================

	return (
		<Grid container spacing={3} className={classes.center}>
			<Grid item xs={12} sm={6} className={classes.center}>
				<Avatar src={save_form.img_preview} className={classes.bigAvatar} />
			</Grid>

			<Grid item xs={12} sm={6} className={classes.center}>
				<input
					hidden
					type="file"
					accept="image/*"
					id="group_form_image"
					onChange={imageChange()}
				/>
				<label htmlFor="group_form_image">
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
				<TextField
					disabled
					fullWidth
					label="Image"
					value={save_form.image.name}
				/>
			</Grid>

			{/*//================================================*/}

			<Grid item xs={12}>
				<TextField
					fullWidth
					label="Name"
					value={save_form.name}
					onChange={inputsChange(types.FORM_NAME)}
				/>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = ({ groupsReducer }) => groupsReducer;

export default connect(
	mapStateToProps,
	groupsActions
)(InputFields);
