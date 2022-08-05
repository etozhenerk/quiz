import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer);

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

root.render(app);
