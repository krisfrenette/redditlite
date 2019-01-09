import * as React from 'react';
import styled from 'styled-components';
import {RedditPost} from 'store/types';
import {DEFAULT_PADDING} from 'app-constants';
import * as moment from 'moment';

interface IPost {
    post: RedditPost;
}

export default class Post extends React.Component<IPost> {
    private onClick(url) {
        window.location.assign(url);
    }

    public render() {
        const {
            post: {title, author, url, created, commentUrl, thumbnail = null}
        } = this.props;
        const dateCreated = moment
            .unix(created)
            .format('MMMM Do YYYY, h:mm:ss a');
        return (
            <PostWrapper onClick={this.onClick.bind(null, url)}>
                <PostHeader>
                    <Author>Posted by: {author}</Author>
                    <DateCreated>Date Posted: {dateCreated}</DateCreated>
                </PostHeader>
                <PostContentWrapper>
                    {thumbnail && thumbnail.url && (
                        <Thumbnail>
                            <StyledImage src={thumbnail.url} />
                        </Thumbnail>
                    )}
                    <Title>{title}</Title>
                </PostContentWrapper>
                <CommentLink>
                    <a href={`https://reddit.com${commentUrl}`}>Comments</a>
                </CommentLink>
            </PostWrapper>
        );
    }
}

const PostWrapper = styled.div`
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid #999999;
    background-color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
`;

const PostHeader = styled.div`
    display: flex;
    font-size: 12px;
    padding: ${DEFAULT_PADDING}px;
`;

const PostContentWrapper = styled.div`
    padding: 0 ${DEFAULT_PADDING}px;
    display: flex;
`;

const Author = styled.div`
    flex: 1;
`;

const DateCreated = styled.div`
    flex: 1;
    text-align: right;
`;

const Title = styled.div`
    flex: 2 auto;
    padding: 0 ${DEFAULT_PADDING}px;
`;
const CommentLink = styled.span`
    padding: ${DEFAULT_PADDING}px;
    font-size: 12px;
`;
const Thumbnail = styled.div`
    width: 100px;
    height: 100px;
`;
const StyledImage = styled.img`
    width: 100%;
`;
