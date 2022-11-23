import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user: {
      id: number | null,
      access_token: string | null
  }
}

const initialState: AuthState = {
  user: {
      id: null,
      access_token: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<AuthState>>) => {
        state = {
            ...state,
            ...action.payload
        };

        return state;
    },
    clearUser: (state) => {
        state = {...initialState};

        return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = authSlice.actions

export default authSlice.reducer