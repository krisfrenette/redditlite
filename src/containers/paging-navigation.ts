import {IRootState} from 'store/types';
import PagingNavigation, {
    StateProps,
    DispatchProps,
    OwnProps
} from 'components/paging-navigation';
import {connect} from 'react-redux';
import {fetchNewPosts} from 'store/subreddit/actions/fetch-new-posts';

const mapStateToProps = (state: IRootState): StateProps => {
    return {
        nextPage: {direction: 'after', value: state.subreddit.after},
        prevPage: {direction: 'before', value: state.subreddit.before}
    };
};

const mapDispatchToProps = (
    dispatch,
    {subreddit}: OwnProps
): DispatchProps => ({
    onPagingClick: ({direction}) => {
        return dispatch(fetchNewPosts({subreddit, direction, scrollTop: true}));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PagingNavigation);
