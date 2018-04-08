import { Action, createAction } from "redux-actions"

export const TITLE_LOAD = "stream/TITLE_LOAD"

export const loadTitle = createAction<string | Error>(TITLE_LOAD)
