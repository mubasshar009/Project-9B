import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  export const { saveToken, clearToken, setAuthState } = auth.actions;
export default auth.reducer;