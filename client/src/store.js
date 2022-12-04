import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

import requestReducer from "./reducers/requestReducer"
import authReducer from "./reducers/authReducer"

const middlewares = [thunk]

const authPersistConfig = {
  key: "authReducer",
  storage,
}

const rootReducer = combineReducers({
  requestReducer,
  authReducer: persistReducer(authPersistConfig, authReducer),
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)
export const persistor = persistStore(store)
