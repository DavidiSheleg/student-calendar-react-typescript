import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskType } from './tasksSlice'


export interface TaskDialogState {
    isOpen: boolean,
    task: TaskType | null
}

const initialState: TaskDialogState = {
    isOpen: false,
    task: null
}

export const taskDialogSlice = createSlice({
    name: 'taskDialog',
    initialState,
    reducers: {

       openTaskDialog: (state, action: PayloadAction<TaskType | null>) => {
           state.isOpen = true;
           state.task = action.payload;
       },

       closeTaskDialog: (state) => {
        state.isOpen = false;
        state.task = null;
       }

    },
})

// Action creators are generated for each case reducer function
export const { openTaskDialog, closeTaskDialog } = taskDialogSlice.actions

export default taskDialogSlice.reducer