import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './userRedux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage
};

// rootReducer will hold all the reducers
const rootReducer = combineReducers({
	user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store holds the state in the persistedReducer
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});

export let persistor = persistStore(store);
