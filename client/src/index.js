import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import {Provider} from "react-redux"
import {store, persistor} from "./store.js"
import {PersistGate} from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
)
