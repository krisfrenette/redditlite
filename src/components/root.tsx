import '@babel/polyfill';

import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Store} from 'redux';
import {IRootState} from 'store/types';
import {Provider} from 'react-redux';
import App from './app';

interface IRoot {
    store: Store<IRootState>;
}

export default class Root extends React.Component<IRoot> {
    public render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <Router>
                    <Route path="/:subreddit?" component={App} />
                </Router>
            </Provider>
        );
    }
}
