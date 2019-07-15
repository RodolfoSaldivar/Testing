import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route } from 'react-router-dom';

import Theme from './Theme';
import Users from './Users';
import Other from './Other';
import Header from './Header';

const App = (props) => (
	<BrowserRouter>
		<Theme>
			<Header />
			<Container>
				<Route exact path="/" component={Other} />
				<Route exact path="/users" component={Users} />
			</Container>
		</Theme>
	</BrowserRouter>
);

export default App;
