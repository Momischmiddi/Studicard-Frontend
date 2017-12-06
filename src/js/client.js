import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"

import Layout from "./pages/Layout"
import store from "./store"

const app = document.getElementById('app');

// In diesem Projekt wurde schon der React Router genutzt. Der Wechsel der Views ist in pages/Layout.js abgebildet.  
ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    app);