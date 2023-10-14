import redux from "redux";
import { produce } from "immer";

const createStore = redux.createStore;
const UPDATE_STREET="UPDATE_STREET";

function updateStreet(street){
    return {
        type:UPDATE_STREET,
        payload:street
    }
}

const initialState ={
    name:"rovin singh",
    age:26,
    address:{
        street:"123 mj ros st",
        dist:"firozabad",
        rajy:"UP"
    }
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case UPDATE_STREET : 
        // return {
        //     ...state,
        //     address:{
        //        ...state.address,
        //         street:action.payload
        //     }
        // }
        return produce(state,(draft)=>{
            draft.address.street=action.payload
        })
        default : return state;
    }
}

const store = createStore(reducer);

console.log("initial state ",store.getState());


const unsubscribe=store.subscribe(()=>{
    console.log("updated state ",store.getState());
})

store.dispatch(updateStreet("564 howkwye st"))

unsubscribe()