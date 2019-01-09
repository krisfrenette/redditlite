// Fix for Node clobbering the global variable
const globalAny: any = global;

import {Thunk} from 'utils/redux';
import {
    fetchNewPosts,
    DEFAULT_LIMIT
} from 'store/subreddit/actions/fetch-new-posts';
import {mockDispatch, mockGetState} from 'utils/testing';
import {ActionNames} from 'store/action-names';
import {newPosts} from 'service/reddit';

let mockShouldFail = false;

const mockCurrentPaging = {
    direction: {
        direction: 'after',
        value: 'mockCurrentPagingValue'
    },
    count: 100
};

const scrollToSpy = jest.fn();
globalAny.scrollTo = scrollToSpy;

jest.mock('service/reddit', () => ({
    newPosts: jest.fn(() => {
        if (mockShouldFail) {
            return null;
        }
        return {
            before: 'before',
            after: 'after',
            children: [
                {
                    data: {
                        author: 'mockAuthor1',
                        permalink: 'mockPermalink1',
                        created: 12345,
                        id: 'mockId1',
                        thumbnail: null,
                        thumbnail_height: null,
                        thumbnail_width: null,
                        title: 'mockTitle1',
                        url: 'mockUrl1'
                    }
                }
            ]
        };
    })
}));

const mockCount = 50;

const getState = mockGetState({
    subreddit: {
        count: mockCount,
        currentPaging: mockCurrentPaging
    }
} as any);
const dispatch = mockDispatch(getState);
const mockSubreddit = 'mockSubreddit';

beforeEach(() => {
    mockShouldFail = false;
    jest.clearAllMocks();
});

describe('fetchNewPosts', () => {
    const performCall = payload => {
        const thunk: Thunk = fetchNewPosts(payload);
        return thunk(dispatch, getState, undefined);
    };

    it('fetch calls request for a given subreddit', async () => {
        await performCall({subreddit: mockSubreddit});
        expect(dispatch).toBeCalledWith({
            type: ActionNames.FETCH_NEW_POSTS_REQUEST
        });
    });

    it('fetch successfully gets posts for a given subreddit', async () => {
        await performCall({subreddit: mockSubreddit});
        expect(dispatch).toMatchSnapshot();
    });

    it('sends a failed action when no posts are returned', async () => {
        mockShouldFail = true;
        try {
            await performCall({subreddit: mockSubreddit});
        } catch (e) {}
        expect(dispatch).toBeCalledWith({
            type: ActionNames.FETCH_NEW_POSTS_FAILED
        });
    });

    it('calls newPosts', async () => {
        await performCall({subreddit: mockSubreddit});
        expect(newPosts).toMatchSnapshot();
    });

    it('fetch calls with after', async () => {
        const mockDirection = {direction: 'after', value: 'mockValue'};

        await performCall({
            subreddit: mockSubreddit,
            direction: mockDirection,
            limit: DEFAULT_LIMIT
        });
        expect(newPosts).toBeCalledWith({
            subreddit: mockSubreddit,
            limit: DEFAULT_LIMIT,
            direction: mockDirection,
            count: mockCount + DEFAULT_LIMIT
        });
    });

    it('fetch calls scroll to top when scrollTop is true', async () => {
        const mockDirection = {direction: 'after', value: 'mockValue'};

        await performCall({
            subreddit: mockSubreddit,
            direction: mockDirection,
            limit: DEFAULT_LIMIT,
            scrollTop: true
        });
        expect(scrollToSpy).toBeCalledWith(0, 0);
    });

    it('fetch calls with before', async () => {
        const mockDirection = {direction: 'before', value: 'mockValue'};

        await performCall({
            subreddit: mockSubreddit,
            direction: mockDirection,
            limit: DEFAULT_LIMIT
        });
        expect(newPosts).toBeCalledWith({
            subreddit: mockSubreddit,
            limit: DEFAULT_LIMIT,
            direction: mockDirection,
            count: mockCount
        });
    });

    it('fetch calls refresh data', async () => {
        const mockDirection = {direction: 'before', value: 'mockValue'};

        await performCall({
            subreddit: mockSubreddit,
            direction: mockDirection,
            refreshData: true,
            limit: DEFAULT_LIMIT
        });
        expect(newPosts).toBeCalledWith({
            subreddit: mockSubreddit,
            limit: DEFAULT_LIMIT,
            direction: mockCurrentPaging.direction,
            count: mockCurrentPaging.count
        });
    });
});
