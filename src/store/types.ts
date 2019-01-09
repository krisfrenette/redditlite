import {ActionNames} from 'store/action-names';

export type SubredditState = {
    name: string;
    posts: RedditPosts;
    before: string;
    after: string;
    count: number;
    currentPaging: {
        direction: PagingDirection;
        count: number;
    };
    fetchingData: boolean;
};

export interface IRootState {
    subreddit: SubredditState;
}

export type RedditPost = {
    id: string;
    author: string;
    title: string;
    url: string;
    created: number;
    commentUrl: string;
    thumbnail?: Thumbnail;
};

export type Thumbnail = {
    url: string;
    width: number;
    height: number;
};

export type PagingDirection = {
    direction: 'before' | 'after';
    value: string;
};

export type RedditPosts = RedditPost[];

export type SubredditActions = {
    FETCH_NEW_POSTS_REQUEST: {
        type: typeof ActionNames.FETCH_NEW_POSTS_REQUEST;
    };
    FETCH_NEW_POSTS_SUCCESS: {
        type: typeof ActionNames.FETCH_NEW_POSTS_SUCCESS;
        payload: {
            before: string;
            after: string;
            posts: RedditPosts;
            currentPaging: {
                direction: PagingDirection;
                count: number;
            };
        };
    };
    RESET_STATE: {
        type: typeof ActionNames.RESET_STATE;
    };
    FETCH_NEW_POSTS_FAILED: {
        type: typeof ActionNames.FETCH_NEW_POSTS_FAILED;
    };
};

export type RootAction = SubredditActions[keyof SubredditActions];
