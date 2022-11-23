import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LessonType } from './calendarSlice'


export interface LessonDialogState {
    isOpen: boolean,
    lesson: LessonType | null
}

const initialState: LessonDialogState = {
    isOpen: false,
    lesson: null
}

export const lessonDialogSlice = createSlice({
    name: 'lessonDialog',
    initialState,
    reducers: {

       openLessonDialog: (state, action: PayloadAction<LessonType | null>) => {
           state.isOpen = true;
           state.lesson = action.payload;
       },

       closeLessonDialog: (state) => {
        state.isOpen = false;
        state.lesson = null;
       }

    },
})

// Action creators are generated for each case reducer function
export const { openLessonDialog, closeLessonDialog } = lessonDialogSlice.actions

export default lessonDialogSlice.reducer