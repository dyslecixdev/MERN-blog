import {createSlice} from '@reduxjs/toolkit';

const postSlice = createSlice({
	name: 'post',
	initialState: {
		posts: [],
		quantity: 0
	},
	reducers: {
		createPost: (state, action) => {
			state.posts.push(action.payload);
			state.quantity += 1;
		}
	}
});

export const {createPost} = postSlice.actions;

export default postSlice.reducer;
