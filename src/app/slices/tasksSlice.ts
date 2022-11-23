import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TaskType = {
    id: number
    task_name?: string;
    date?: Date;
    done?: boolean | number;
}

export interface TasksState {
    data: TaskType[]
}

const initialState: TasksState = {
    data: [],
}

export const TasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        setTasks: (state, action: PayloadAction<TaskType[]>) => {
            state.data = action.payload;
        },

        addTask: (state, action: PayloadAction<TaskType>) => {
            state.data = [...state.data, action.payload]
            return state;
        },

        removeTask: (state, action: PayloadAction<number>) => {
            const taskIndex = state.data.findIndex(item => item.id === action.payload);
            if (taskIndex > -1)
                state.data.splice(taskIndex, 1);
        },

        updateTask: (state, action: PayloadAction<TaskType>) => {
            const taskIndex = state.data.findIndex(item => item.id === action.payload.id);
            if (taskIndex > -1)
                state.data[taskIndex] = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTasks, addTask, removeTask, updateTask } = TasksSlice.actions

export default TasksSlice.reducer