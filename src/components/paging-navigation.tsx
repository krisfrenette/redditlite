import * as React from 'react';
import styled from 'styled-components';
import {DEFAULT_PADDING} from 'app-constants';
import {PagingDirection} from 'store/types';

export type OwnProps = {
    subreddit: string;
};

export type StateProps = {
    prevPage: PagingDirection;
    nextPage: PagingDirection;
};

export type DispatchProps = {
    onPagingClick: ({direction}: {direction: PagingDirection}) => any;
};

interface IPagingNavigation extends OwnProps, StateProps, DispatchProps {}

export default class PagingNavigation extends React.Component<
    IPagingNavigation
> {
    public render() {
        const {nextPage, prevPage, onPagingClick} = this.props;
        return (
            <PagingNavigationWrapper>
                <button
                    disabled={!prevPage.value}
                    onClick={onPagingClick.bind(null, {
                        direction: prevPage
                    })}>
                    Prev
                </button>
                <button
                    disabled={!nextPage.value}
                    onClick={onPagingClick.bind(null, {
                        direction: nextPage
                    })}>
                    Next
                </button>
            </PagingNavigationWrapper>
        );
    }
}

const PagingNavigationWrapper = styled.div`
    text-align: center;
    margin: ${DEFAULT_PADDING}px;

    button {
        margin: ${DEFAULT_PADDING}px 0 ${DEFAULT_PADDING * 2}px 0;
    }
`;
