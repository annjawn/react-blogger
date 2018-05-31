import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import PostsShow from './components/posts_show';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//<Switch> matches the most specific routes first
//so that "/" route won't be rendered if "/posts/new" route is passed

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
