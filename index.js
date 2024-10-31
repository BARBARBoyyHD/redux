const redux = require('redux')
const reduslogger = require('redux-logger')

const createStore = redux.createStore   
const CombineReducer = redux.combineReducers
const logger = reduslogger.createLogger()
const applyMiddleware = redux.applyMiddleware


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'
const BUY_BURGER = 'BUY_BURGER'

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action',
    }
}

function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        info: 'Second redux action',
    }
}

function buyBurger(){
    return{
        type: BUY_BURGER,
        info: 'Third redux action',
    }
}

// (previousState, action) => newState

// const initialState = {
//     numberOfCakes: 10,
//     numberOfIceCreams: 20
// }

const cakeInitialState = {
    numberOfCakes: 10
}

const iceCreamInitialState = {
    numberOfIceCreams: 20
}

const burgerInitialState = {
    numberOfBurgers: 30
}

const cakeReducer = (state = cakeInitialState, action)=>{
    switch(action.type){
        case BUY_CAKE :return{
            ...state,
            numberOfCakes: state.numberOfCakes - 1
        }
        default:return state
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action)=>{
    switch(action.type){
        case BUY_ICECREAM :return{
            ...state,
            numberOfIceCreams: state.numberOfIceCreams - 1
        }
        default:return state
    }
}

const burgerReducer = (state = burgerInitialState, action)=>{
    switch(action.type){
        case BUY_BURGER :return{
            ...state,
            numberOfBurgers: state.numberOfBurgers - 1
        }
        default:return state
    }
}

const rootReducer  = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    burger: burgerReducer
})

const store = createStore(rootReducer,applyMiddleware(logger))
console.log('initial state',store.getState());
const unsubscribe = store.subscribe(()=>{});
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyBurger())
store.dispatch(buyBurger())
unsubscribe()