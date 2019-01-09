import * as React from 'react';
import {RedditPosts} from 'store/types';
import styled from 'styled-components';
import Post from 'components/post';
import * as _ from 'lodash';
import PagingNavigation from 'containers/paging-navigation';

export type OwnProps = {
    subreddit: string;
};

export type StateProps = {
    posts: RedditPosts;
    fetchingData: boolean;
};

export type DispatchProps = {
    fetchNewPosts: (refreshData?: boolean) => void;
    resetState: () => void;
};

const DEFAULT_INTERVAL = 60000;

interface IListPostsProps extends OwnProps, StateProps, DispatchProps {}

export default class ListPosts extends React.Component<IListPostsProps> {
    public state = {
        timer: null
    };

    public componentDidMount() {
        this.props.fetchNewPosts();
    }

    public componentWillUpdate() {
        const {timer} = this.state;
        clearInterval(timer);
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.subreddit !== this.props.subreddit) {
            this.props.resetState();
            this.props.fetchNewPosts();
        }

        const timer = setInterval(
            this.props.fetchNewPosts.bind(null, {refreshData: true}),
            DEFAULT_INTERVAL
        );
        this.state.timer = timer;
    }

    public render() {
        const {subreddit} = this.props;
        return (
            <ProjectListWrapper>
                {this.getPosts()}
                <PagingNavigation subreddit={subreddit} />
            </ProjectListWrapper>
        );
    }

    private getPosts() {
        const {posts, subreddit, fetchingData} = this.props;
        if (!posts.length && !fetchingData) {
            return (
                <EmptySubreddit>
                    Oops! Doesn't look like there is anything in {subreddit}!
                    Please use type another subreddit or select from the menu
                    above.
                </EmptySubreddit>
            );
        }
        return _.map(posts, post => {
            return <Post post={post} key={post.id} />;
        });
    }
}

const ProjectListWrapper = styled.div``;
const EmptySubreddit = styled.div`
    font-size: 14px;
    text-align: center;
`;
