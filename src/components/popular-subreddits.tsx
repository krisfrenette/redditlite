import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {DEFAULT_PADDING} from 'app-constants';

export default class PopularSubreddits extends React.Component {
    public render() {
        return (
            <SubredditWrapper>
                <label>Select a subreddit:</label>
                <StyledLink to="/news">News</StyledLink>
                <StyledLink to="/funny">Funny</StyledLink>
                <StyledLink to="/gifs">Gifs</StyledLink>
                <StyledLink to="/news">News</StyledLink>
                <StyledLink to="programming">Programming</StyledLink>
            </SubredditWrapper>
        );
    }
}

const SubredditWrapper = styled.div`
    font-size: 12px;
    margin: ${DEFAULT_PADDING}px;

    label {
        margin-right: ${DEFAULT_PADDING}px;
    }
`;

const StyledLink = styled(Link)`
    padding: ${DEFAULT_PADDING}px;
    color: blue;
`;
