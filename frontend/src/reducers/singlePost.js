import {createSlice} from "@reduxjs/toolkit"

const singlePostReducer = createSlice({
    name:"singlePost",
    initialState:{},
    reducers:{
        // login
        singlePostRequest(state){
            state.loading = true
            state.post = null
        },
        singlePostSuccess(state,action){
            state.loading = false,
            state.post= action.payload
        },
        singlePostFailure(state,action){
            state.post= null
            state.message= action.payload,
            state.loading = false
        },
         
    }
})

export default  singlePostReducer.reducer
const {singlePostFailure,singlePostRequest,singlePostSuccess} = singlePostReducer.actions
export {singlePostFailure,singlePostRequest,singlePostSuccess}