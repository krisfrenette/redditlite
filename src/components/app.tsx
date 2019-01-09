import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {createGlobalStyle} from 'styled-components';
import {DEFAULT_SUBREDDIT} from 'app-constants';
import ListPosts from 'containers/list-posts';
import styled from 'styled-components';
import PopularSubreddits from 'components/popular-subreddits';

interface IMatchParams {
    subreddit: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {}

export default class App extends React.Component<IProps> {
    public render() {
        const {
            match: {
                params: {subreddit = DEFAULT_SUBREDDIT}
            }
        } = this.props;
        return (
            <AppContainer>
                <GlobalStyle />
                <PopularSubreddits />
                <ListPosts subreddit={subreddit} />
            </AppContainer>
        );
    }
}

const AppContainer = styled.div``;

const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-color: #eeeeee;
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
