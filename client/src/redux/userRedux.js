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
		}
	}
});

export const {loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure} =
	userSlice.actions;

export default userSlice.reducer;
