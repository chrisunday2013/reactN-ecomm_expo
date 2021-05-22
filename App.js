import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import NavigationContainer from "./navigation/navigationContainer";
import productsReducer from "./store/reducers/products";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import cartReducer from "./store/reducers/cart";
import authReducer from "./store/reducers/auth";
import ordersReducer from "./store/reducers/order";
import ReduxThunk from "redux-thunk";


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {

return (
    <Provider store={store}>
       <NavigationContainer/>
    </Provider>  
  )
}


