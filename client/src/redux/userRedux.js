import {createSlice} from '@reduxjs/toolkit';

// A slice (e.g. userSlice) creates a slice with its own name, its values' initial states, and reducer functions that change some/all of the state
const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false
	},
	reducers: {
		loginStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isFetching = false;
		},
		loginFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		logoutStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		logoutSuccess: state => {
			state.currentUser = null;
			state.isFetching = false;
		},
		logoutFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		updateUserStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isFetching = false;
		},
		updateUserFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		deleteUserStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		deleteUserSuccess: state => {
			state.currentUser = null;
			state.isFetching = false;
		},
		deleteUserFailure: state => {
			state.isFetching = false;
			state.error = true;
		}
	}
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logoutStart,
	logoutSuccess,
	logoutFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;
