import redux, { applyMiddleware } from "redux";
import reduxLogger from "redux-logger" 

const logger = reduxLogger.createLogger();

const createStore =redux.createStore;

const CACK_ORDERED="CACK_ORDERED";
const CACK_RESTOCKED="CACK_RESTOCKED";


function orderCack(){
    return {
        type:CACK_ORDERED,
        payload:1
    }
}

function restockCake(qty=1){
    return {
        type:CACK_RESTOCKED,
        payload:qty
    }
}

const initialState={
    noOfCakes:10
}

function cackReducer(state=initialState,action){
    switch(action.type){
        case CACK_ORDERED :
            return {
                ...state,noOfCakes:state.noOfCakes-action.payload
            }
        case CACK_RESTOCKED:
            return{
                ...state,noOfCakes:state.noOfCakes+action.payload
            }
        default:
            return state
    }
}

const store = createStore(cackReducer,applyMiddleware(logger));
console.log("initial state ",store.getState());


const unsubscribe = store.subscribe(()=>{
    console.log("Update state ",store.getState())
})

store.dispatch(orderCack())
store.dispatch(orderCack())
store.dispatch(orderCack())
store.dispatch(restockCake(3))

unsubscribe();