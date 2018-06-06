import { Store, applyMiddleware, combineReducers, createStore as createStoreRedux } from "redux"

import { ApplicationState } from "src/redux/ApplicationState"
import { History } from "history"
import { applicationStateReducer } from "src/redux/reducers/applicationStateReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import { routerMiddleware } from "react-router-redux"

export function createStore(history: History): Store<ApplicationState> {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStoreRedux<ApplicationState>(
        applicationStateReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history), createLogger()))
    )

    if (module.hot) {
        module.hot.accept("src/redux/reducers/applicationStateReducer", () => {
            // tslint:disable-next-line:no-require-imports
            // const nextReducer = require("./src/redux/reducers/applicationStateReducer");
            store.replaceReducer(applicationStateReducer)
        })
    }

    return store
}
