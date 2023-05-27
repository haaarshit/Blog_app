import {createSlice} from "@reduxjs/toolkit"

const getUserReducer = createSlice({
    name:"getUserReducer",
    initialState:{},
    reducers:{
        // login
        getUserRequest(state){
            
            state.loading = true
            state.userdata = null
        },
         getUserSuccess(state,action){
            state.loading = false,
            state.userdata = action.payload
        },
        getUserFailure(state,action){
            state.user = null,
            state.message= action.payload,
            state.loading = false
        },
         
    }
})

export default  getUserReducer.reducer
const {getUserFailure,getUserRequest,getUserSuccess} = getUserReducer.actions
export {getUserFailure,getUserRequest,getUserSuccess}