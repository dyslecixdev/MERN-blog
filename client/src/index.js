import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			{/* Provider allows access to the state in the redux store anywhere in the app */}
			<Provider store={store}>
				{/* PersistGate persists the state in the redux store between page refreshes */}
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
