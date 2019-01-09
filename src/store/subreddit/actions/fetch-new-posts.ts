import {Thunk} from 'utils/redux';
import {ActionNames} from 'store/action-names';
import {newPosts} from 'service/reddit';
import * as _ from 'lodash';
import {RedditPosts, PagingDirection} from 'store/types';

type FetchNewPostArgs = {
    subreddit: string;
    direction?: PagingDirection;
    scrollTop?: boolean;
    limit?: number;
    refreshData?: boolean;
};
export const DEFAULT_LIMIT = 25;

export const fetchNewPosts = ({
    subreddit,
    direction = null,
    scrollTop = false,
    refreshData = false,
    limit = DEFAULT_LIMIT
}: FetchNewPostArgs): Thunk => {
    return async (dispatch, getState) => {
        const {
            subreddit: {count, currentPaging}
        } = getState();
        dispatch({
            type: ActionNames.FETCH_NEW_POSTS_REQUEST
        });

        let newCount = count;

        if (!refreshData) {
            if (direction && direction.direction === 'after') {
                newCount += limit;
            }
        }

        const pagingData = {
            direction: refreshData ? currentPaging.direction : direction,
            count: refreshData ? currentPaging.count : newCount
        };

        const response = await newPosts({
            subreddit,
            limit,
            direction: pagingData.direction,
            count: pagingData.count
        });

        if (!response) {
            dispatch({
                type: ActionNames.FETCH_NEW_POSTS_FAILED
            });
            return;
        }

        const {before, after, children} = response;

        if (!refreshData) {
            if (direction && direction.direction === 'before') {
                newCount -= limit;
            }
        }

        if (scrollTop) {
            window.scrollTo(0, 0);
        }

        if (children.length > 0) {
            const posts = _.reduce(
                children,
                (accum: RedditPosts, {data: post}) => {
                    const {
                        author,
                        permalink: commentUrl,
                        created,
                        id,
                        thumbnail = null,
                        thumbnail_height = null,
                        thumbnail_width = null,
                        title,
                        url
                    } = post;
                    const redditPost = {
                        author,
                        commentUrl,
                        created,
                        id,
                        thumbnail: {
                            url: thumbnail,
                            width: thumbnail_width,
                            height: thumbnail_height
                        },
                        title,
                        url
                    };
                    accum.push(redditPost);
                    return accum;
                },
                []
            );

            dispatch({
                type: ActionNames.FETCH_NEW_POSTS_SUCCESS,
                payload: {
                    before,
                    after,
                    posts,
                    count: newCount,
                    currentPaging: pagingData
                }
            });
        }
    };
};
