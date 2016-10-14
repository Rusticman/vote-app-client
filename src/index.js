import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import Homepage from './components/homepage';
import RequireAuth from './components/auth/require_auth';
import Signout from './components/auth/signout';
import CreatePoll from './components/create_poll';
import ViewPolls from './components/view_polls';
import MyPolls from './components/my_polls';
import ShowPoll from './components/show_poll';
import Loader from './components/loader';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = sessionStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}


ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
      <Route path="createpoll" component={RequireAuth(CreatePoll)} />
      <Route path="signout" component={Signout} />
      <Route path="viewpolls" component={ViewPolls} />
      <Route path="viewpolls/:pollID" component={ShowPoll} />
      <Route path="mypolls" component={RequireAuth(MyPolls)} />
      <Route path="mypolls/:pollID" component={RequireAuth(ShowPoll)} />
      <Route path="loader" component={Loader} />
    </Route>
  </Router>
  </Provider>
  , document.querySelector('.appContainer'));
