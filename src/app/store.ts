import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import calendarReducer from './slices/calendarSlice';
import lessonDialogReducer from './slices/lessonDialogSlice';
import snackbarReducer from './slices/snackbarSlice';
import tasksReducer from './slices/tasksSlice';
import taskDialogReducer from './slices/taskDialogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    lessonDialog: lessonDialogReducer,
    snackbar: snackbarReducer,
    tasks: tasksReducer,
    taskDialog: taskDialogReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch