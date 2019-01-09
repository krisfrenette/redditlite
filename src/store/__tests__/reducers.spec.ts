import reducer from 'store/reducers';

jest.mock('redux', () => ({
    combineReducers: reducers => reducers
}));

jest.mock('store/subreddit', () => ({
    default: 'subreddit'
}));

describe('reducers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('reducers entry point', () => {
        describe('reducers entry point', () => {
            it('combines all reducers', () => {
                expect(reducer).toEqual({
                    subreddit: 'subreddit'
                });
            });
        });
    });
});
