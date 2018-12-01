import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'

import './index.css';
import App from './App';
import reducers from './reducers'

let store = createStore(reducers)
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router> 
    </Provider>    
, document.getElementById('root'));
