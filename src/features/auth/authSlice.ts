import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "yup";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      saveToken:(state, { payload }: PayloadAction<AuthState | null>)=> {
        if(payload) {
          state.token = payload.token;
        }
      },
      clearToken(state) {
        state.token = null;
      },
      setAuthState:(state, { payload }: PayloadAction<AuthState | null>) =>{
        if(payload){
            state.isAuthenticated = payload?.isAuthenticated;
        }
        
      },
    },
  });