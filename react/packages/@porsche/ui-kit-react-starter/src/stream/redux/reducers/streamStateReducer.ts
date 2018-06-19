import { TITLE_LOAD, loadTitle } from "src/stream/redux/actions/loadTitle"
import { StreamState, initialStreamState } from "src/stream/redux/StreamState"

import { handleAction } from "redux-actions"

const loadTitleReducer = handleAction<StreamState, string>(
    TITLE_LOAD,
    {
        next: (state, action): StreamState => {
            if (!action.payload) {
                return state
            }

            return {
                ...state,
                title: action.payload
            }
        },
        throw: (state, action): StreamState => {
            return state
        }
    },
    initialStreamState
)

export const streamStateReducer = loadTitleReducer
