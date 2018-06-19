import reduceReducers from "reduce-reducers"
import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import { ApplicationState } from "src/redux/ApplicationState"
import { streamStateReducer } from "src/stream/redux/reducers/streamStateReducer"

const reducer = combineReducers<ApplicationState>({
    form: formReducer,
    router: routerReducer,
    stream: streamStateReducer
})

export const applicationStateReducer = reducer
