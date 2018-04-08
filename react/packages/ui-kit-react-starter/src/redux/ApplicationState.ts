import { RouterState } from "react-router-redux"
import { FormStateMap } from "redux-form"
import { StreamState } from "src/stream/redux/StreamState"

export interface ApplicationState {
    form: FormStateMap
    router: RouterState
    stream: StreamState
}
