import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { format } from 'date-fns';

export type LessonType = {
    id: number
    title?: string;
    start?: Date | undefined;
    end?: Date | undefined;
    color?: string;
}

export interface CalendarState {
    date: string,
    view: 'week' | 'day' | 'month' | 'work_week' | 'agenda',
    lessons: LessonType[]
}

const initialState: CalendarState = {
    date: format(new Date(), 'yyyy-MM-dd'),
    view: 'week',
    lessons: []
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {

        setLessons: (state, action: PayloadAction<LessonType[]>) => {
            state.lessons = action.payload;
        },

        setView: (state, action: PayloadAction<'week' | 'day' | 'month' | 'work_week' | 'agenda'>) => {
            if (state.view !== action.payload)
                state.view = action.payload;
        },

        setCalendarDate: (state, action: PayloadAction<string>) => {
            if (state.date !== action.payload)
                state.date = action.payload;
        },

        addLesson: (state, action: PayloadAction<LessonType>) => {
            state.lessons = [...state.lessons, action.payload]
            return state;
        },

        removeLesson: (state, action: PayloadAction<number>) => {
            const lessonIndex = state.lessons.findIndex(item => item.id === action.payload);
            if (lessonIndex > -1)
                state.lessons.splice(lessonIndex, 1);
        },

        updateLesson: (state, action: PayloadAction<LessonType>) => {
            const lessonIndex = state.lessons.findIndex(item => item.id === action.payload.id);
            if (lessonIndex > -1)
                state.lessons[lessonIndex] = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLessons, setView, setCalendarDate, addLesson, removeLesson, updateLesson } = calendarSlice.actions

export default calendarSlice.reducer