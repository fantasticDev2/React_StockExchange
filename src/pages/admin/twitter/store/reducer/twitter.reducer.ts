import {ADD_TWEET, State} from "../state";
import {ITwitter} from "../../../../../shared/models/twitter.model";


export type Action =
    { type: "deleteTwitter" }
    | { type: "deleteTwitterFailed" }
    | { type: "loadTwitters", payload: Array<ITwitter> }
    | { type: "addTweet", payload: ITwitter }
    | { type: "loadTwittersFailed" }
    | { type: "setUpdateAlertOpen", payload: boolean }
    | { type: "setDeleteAlertOpen", payload: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "deleteTwitter":
            return {
                ...state
            };
        case "deleteTwitterFailed":
            return {
                ...state,
            };
        case "loadTwitters":
            return {
                ...state,
                twitters: action.payload
            };
        case "loadTwittersFailed":
            return {
                ...state,
                twitters: Array<ITwitter>()
            };
        case ADD_TWEET:
            return {
                ...state,
                twitters: [...state.twitters, action.payload]
            };
        case "setUpdateAlertOpen":
            return {
                ...state,
                updateAlertOpen: action.payload
            }
        case "setDeleteAlertOpen":
            return {
                ...state,
                deleteAlertOpen: action.payload
            }
    }
};
