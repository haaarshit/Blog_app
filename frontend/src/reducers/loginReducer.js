import {createSlice} from "@reduxjs/toolkit"

const loginReducer = createSlice({
    name:"loginReducer",
    initialState:{},
    reducers:{
        // login 
        loginRequest(state){
            state.isAuthenticated = false,
            state.loading = true
        },
        loginSuccess(state,action){
            state.isAuthenticated = true
            state.message = action.payload,
            state.loading = false
        },
        loginFailure(state,action){
            state.isAuthenticated = false;
            state.message = action.payload,
            state.loading = false
        },
        // register
        registerRequest(state){
            state.isAuthenticated = false,
            state.loading = true
        },
        registerSuccess(state,action){
            state.isAuthenticated = true,
            state.message = action.payload,
            state.loading = true
        },
        
        registerFailure(state,action){
            state.isAuthenticated = false,
            state.message = action.payload,
            state.loading = true
        },
        // logout
        logoutRequest(state){
            state.loading = true
        },
        logoutSuccess(state){
            state.loading = false,
            state.isAuthenticated =  false
        },
        logoutFailure(state,action){
            state.loading = false,
            state.message = action.payload,
            state.isAuthenticated =  true
        }
    }
})

export default  loginReducer.reducer
const {loginRequest,loginSuccess,loginFailure,registerFailure,registerRequest,registerSuccess,logoutFailure,logoutRequest,logoutSuccess} = loginReducer.actions
export {loginRequest,loginSuccess,loginFailure,registerFailure,registerRequest,registerSuccess,logoutFailure,logoutRequest,logoutSuccess} 