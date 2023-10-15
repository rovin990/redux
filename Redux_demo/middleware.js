const redux,{applyMiddleware} = require("redux");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const createStore= redux.createStore;

const CAKE_ORDERED="CAKE_ORDERED";

const initialCakeState={
  noOfCake:10
}

function cakeOrder(qty=1){
  return {
    type:CAKE_ORDERED,
    quantity:qty
  }
}

const cakeReduce=(state=initialCakeState,action)=>{

      switch(action.type){
        case CAKE_ORDERED :
          return {
            ...state,state.noOfCake -= action.payload;
        }
      default : return state;
      }
}

const store = createStore(reducer,applyMiddleware(logger));

const unsubscribe= store.subscribe(()=>{
})

store.dispatch(cakeOrder(2));

unsubscribe();

