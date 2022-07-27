import { createSlice } from '@reduxjs/toolkit';

export const masterDataSlice = createSlice({
    name: 'masterData',
    initialState: {
        isLoading: false,
        data: {}
    },
    reducers: {
        onLoadMasterData: (state, { payload }) => {
            state.data = payload;
            console.log(state.isLoading);
            state.isLoading = true;
            console.log(state.isLoading);
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLoadMasterData } = masterDataSlice.actions;