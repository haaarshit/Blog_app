import {createSlice} from "@reduxjs/toolkit"

const postsReducer = createSlice({
    name:"postsReducer",
    initialState:{},
    reducers:{
        // login
        postsRequest(state){
            state.loading = true
            state.posts = null
        },
        postsSuccess(state,action){
            state.loading = false,
            state.posts = action.payload
        },
        postsFailure(state,action){
            state.posts = null
            state.message= action.payload,
            state.loading = false
        },
         
    }
})

export default  postsReducer.reducer
const {postsFailure,postsRequest,postsSuccess} = postsReducer.actions
export {postsFailure,postsRequest,postsSuccess}