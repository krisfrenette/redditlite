import {connect} from 'react-redux';
import ListPosts, {
    OwnProps,
    StateProps,
    DispatchProps
} from 'components/list-posts';
import {IRootState} from 'store/types';
import {fetchNewPosts} from 'store/subreddit/actions/fetch-new-posts';
import {ActionNames} from 'store/action-names';

const mapStateToProps = (state: IRootState, ownProps: OwnProps): StateProps => {
    const {
        subreddit: {posts, fetchingData}
    } = state;
    return {
        posts,
        fetchingData
    };
};

const mapDispatchToProps = (
    dispatch,
    {subreddit}: OwnProps
): DispatchProps => ({
    fetchNewPosts: (refreshData = false) =>
        dispatch(fetchNewPosts({subreddit, refreshData})),
    resetState: () => dispatch({type: ActionNames.RESET_STATE})
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPosts);
