import {ITwitter} from "../../../../../shared/models/twitter.model";

export type State = {
    twitters: Array<ITwitter>
    updateAlertOpen: boolean
    deleteAlertOpen: boolean
};

export const initialState: State = {
    twitters: Array<ITwitter>(),
    updateAlertOpen: false,
    deleteAlertOpen: false,
};

export const ADD_TWEET = 'addTweet';
