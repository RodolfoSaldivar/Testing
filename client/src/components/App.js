import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './Users';
import Other from './Other';
import Header from './Header';

const App = (props) => (
	<BrowserRouter>
		<Header />
		<Container fixed>
			<Route exact path="/" component={Users} />
			<Route exact path="/other" component={Other} />
		</Container>
	</BrowserRouter>
);

export default App;
