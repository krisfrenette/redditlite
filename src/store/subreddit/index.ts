import {SubredditState, RootAction} from 'store/types';
import {ActionNames} from 'store/action-names';

const getDefaultState = (): SubredditState => {
    return {
        name: null,
        posts: [],
        before: null,
        after: null,
        count: 0,
        currentPaging: null,
        fetchingData: true
    };
};

export default function reducer(
    state: SubredditState = getDefaultState(),
    action: RootAction
): SubredditState {
    switch (action.type) {
        case ActionNames.FETCH_NEW_POSTS_REQUEST:
            return {
                ...state,
                fetchingData: true
            };
        case ActionNames.FETCH_NEW_POSTS_SUCCESS:
            return {
                ...state,
                fetchingData: false,
                ...action.payload
            };
        case ActionNames.FETCH_NEW_POSTS_FAILED:
            return {
                ...state,
                fetchingData: false
            };
        case ActionNames.RESET_STATE:
            return getDefaultState();

        default:
            return state;
    }
}
