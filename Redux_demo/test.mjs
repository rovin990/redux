import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';

const FETCH_USERS_REQUESTED="FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED="FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED="FETCH_USERS_FAILED";


function fetchUserRequest(){
    return{
        type:FETCH_USERS_REQUESTED
    }
}

function fetchUserSuccess(users){
    return {
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}

function fetchUserFail(error){
    return {
        type:FETCH_USERS_FAILED,
        payload:error
    }
}

const initialState ={
    isLoading:true,
    users:[],
    error:""
}

function reducer(state=initialState,action){
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return state;
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,isLoading:false,users:action.payload
            }
        case FETCH_USERS_FAILED:
            return{
                ...state,isLoading:false,error:action.payload
            }
    }
}

//middleware action creator using redux-thunk

function fetchUsers(){
    return (dispatch)=>{
        dispatch(fetchUserRequest());
        axios.get("https://jsonplaceholder.typicode.com/users").then(res=>{
                const users = res.data.map(user=>user.id);
                dispatch(fetchUserSuccess(users))
                }
             )
             .catch(error=>{
                dispatch(fetchUserFail(error.message))
             });
    }
}

// create store
console.log("Thunk :",thunk)
const middleware = applyMiddleware(reduxPromiseMiddleware, thunk);
const store = createStore(reducer, middleware);

const unsubscribe=store.subscribe(()=>{
    log("States : ",store.getState())
})

store.dispatch(fetchUsers())
unsubscribe();