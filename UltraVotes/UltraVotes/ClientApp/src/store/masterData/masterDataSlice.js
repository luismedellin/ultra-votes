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
            state.isLoading = true;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLoadMasterData } = masterDataSlice.actions;