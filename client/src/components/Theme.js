import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: green
	},
	width100: {
		width: '100%'
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

const Theme = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
