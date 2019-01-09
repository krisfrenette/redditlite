import '@babel/polyfill';

import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Root from 'components/root';
import reducers from 'store/reducers';

document.addEventListener('DOMContentLoaded', () => {
    const composeEnhancers =
        process.env.NODE_ENV === 'development' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    const renderApp = RootComponent =>
        render(
            <RootComponent store={store} />,
            document.getElementById('root')
        );

    renderApp(Root);
});
