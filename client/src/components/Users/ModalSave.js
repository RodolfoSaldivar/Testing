import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';

import UserAndGroupForms from './UserAndGroupForms';

//================================================

const useStyles = makeStyles((theme) => ({
	dialogContent: { padding: theme.spacing(4) },
	marginRight: { marginRight: theme.spacing(5) },
	dialog: {
		maxHeight: 'calc(100% - 30px)',
		margin: 15
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
}));

//================================================

const ModalSave = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setIsDisabled(false);
	};

	return (
		<div>
			<div onClick={handleOpen}>{props.children}</div>
			<Dialog
				fullWidth
				open={open}
				maxWidth="sm"
				onClose={handleClose}
				PaperProps={{ className: classes.dialog }}
			>
				{/*//================================================*/}

				<DialogTitle disableTypography>
					<Typography variant="h6">Save User</Typography>
					<IconButton
						aria-label="Close"
						className={classes.closeButton}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				{/*//================================================*/}

				<DialogContent dividers className={classes.dialogContent}>
					<UserAndGroupForms setIsDisabled={setIsDisabled} />
				</DialogContent>

				{/*//================================================*/}

				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						className={classes.marginRight}
						disabled={isDisabled}
					>
						Save
					</Button>
					<Button
						onClick={handleClose}
						disabled={isDisabled}
						variant="outlined"
					>
						Close
					</Button>
				</DialogActions>

				{/*//================================================*/}
			</Dialog>
		</div>
	);
};

export default ModalSave;
