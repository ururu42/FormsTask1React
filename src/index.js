import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
// import AppJs from './Appjs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		{/* <AppJs /> */}
	</React.StrictMode>,
);
