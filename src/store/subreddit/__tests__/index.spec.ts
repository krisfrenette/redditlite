import reducer from 'store/subreddit';
import {ActionNames} from 'store/action-names';

describe('reducer', () => {
    it('sets a default state', () => {
        expect(reducer(undefined, {type: 'foobar'} as any)).toMatchSnapshot();
    });

    it('handles the fetch posts request action', () => {
        expect(
            reducer({} as any, {
                type: ActionNames.FETCH_NEW_POSTS_REQUEST
            })
        ).toMatchSnapshot();
    });

    it('handles the fetch posts success action', () => {
        expect(
            reducer({} as any, {
                type: ActionNames.FETCH_NEW_POSTS_SUCCESS,
                payload: {
                    before: null,
                    after: null,
                    posts: [{id: 'mockId'}],
                    currentPaging: {
                        direction: null,
                        count: 0
                    }
                } as any
            })
        ).toMatchSnapshot();
    });

    it('handles the fetch posts failed action', () => {
        expect(
            reducer({} as any, {
                type: ActionNames.FETCH_NEW_POSTS_FAILED
            })
        ).toMatchSnapshot();
    });

    it('handles the reset state', () => {
        expect(
            reducer({} as any, {
                type: ActionNames.RESET_STATE
            })
        ).toMatchSnapshot();
    });
});
