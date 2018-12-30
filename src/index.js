// mengoordinasikan file project berdasarkan component
// jadi action, constant, reducers yg terlibat oleh component tersebut
// dijadikan satu folder
// mengoordinasika file project sangat penting untuk scalability project

// belajar library 'React Router'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
// thunk Middleware is aware again actions that return a function instead of an object
// remember: a middleware is just a tunnel that actions go through
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App2 from './containers/App2';
import * as serviceWorker from './serviceWorker';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons';

// logger is one of middleWare ; coba Redux DevTools (chrome extension)
const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, requestRobots});

// jika reduce banyak maka dibuat store rootReducer sebagai kumpulan reducer
// const store = createStore(rootReducer);

// contoh 1 store 1 reducer
// const store = createStore(searchRobots, applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App2 />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();