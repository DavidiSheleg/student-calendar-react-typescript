import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type messageType = 'success' | 'error' | 'info' | 'warning';

export interface sanckbarState {
    snackbarIsOpen: boolean,
    snackbarMessage: string,
    snackbarType: messageType
}

const initialState: sanckbarState = {
    snackbarIsOpen: false,
    snackbarMessage: '',
    snackbarType: 'info'
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {

        openSnackbar: (state, action: PayloadAction<{ snackbarMessage: string, snackbarType: messageType }>) => {
            state.snackbarIsOpen = true;
            state.snackbarMessage = action.payload.snackbarMessage;
            state.snackbarType = action.payload.snackbarType;
        },

        closeSnackbar: (state) => {
            state.snackbarIsOpen = false;
        }

    },
})

// Action creators are generated for each case reducer function
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer