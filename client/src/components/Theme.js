import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple, green } from '@material-ui/core/colors';

const appTheme = (theme) =>
	createMuiTheme({
		palette: {
			primary: purple,
			secondary: green
		},
		width100: {
			width: '100%'
		},
		dialogHeight: {
			maxHeight: 'calc(100% - 30px)',
			margin: 15
		},
		modalCloseButton: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500]
		},
		absoluteCenter: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		bigAvatar: {
			width: 150,
			height: 150
		}
	});

// Create 2 providers so we can use the "theme" in "appTheme"
const Theme = ({ children }) => (
	<ThemeProvider theme={createMuiTheme()}>
		<ThemeProvider theme={appTheme}>{children}</ThemeProvider>
	</ThemeProvider>
);

export default Theme;
