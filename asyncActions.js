const redux = require('redux');
const createStore = redux.createStore;
const ApplyMiddleware = redux.applyMiddleware;
const thunkMiddleWare = require("redux-thunk").thunk;

const axios = require('axios');

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
};

const fetchUserSuccess = (users) => { 
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
};

const fetchUserFailure = (error) => { 
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS: 
            return {
                loading: false,
                users: action.payload,
                error: ''
            };
        case FETCH_USERS_FAILURE: 
            return {
                loading: false,
                users: [],
                error: action.payload
            };
        default: 
            return state;
    }
};

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUserSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message));
            });
    };
};

// Create store with middleware
const store = createStore(reducer, ApplyMiddleware(thunkMiddleWare));

// Subscribe to store updates
store.subscribe(() => console.log(store.getState()));

// Dispatch the fetchUsers action
store.dispatch(fetchUsers());