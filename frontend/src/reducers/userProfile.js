import {createSlice} from "@reduxjs/toolkit"

const userReducer = createSlice({
    name:"userReducer",
    initialState:{},
    reducers:{
        // login
        profileRequest(state){
            state.isAuthenticated = false,
            state.loading = true
            state.mydata = null
        },
         profileSuccess(state,action){
            state.loading = false,
            state.isAuthenticated = true
            state.mydata = action.payload
        },
        profileFailure(state,action){
            state.mydata = null
            state.isAuthenticated = false;
            state.message= action.payload,
            state.loading = false
        },
         
    }
})

export default  userReducer.reducer
const {profileFailure,profileRequest,profileSuccess} = userReducer.actions
export {profileFailure,profileRequest,profileSuccess}