import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../components/require_auth';
import Loadable from 'react-loadable';
import ContentLoader from 'react-content-loader';

const notFound = () => <h1>Page not found</h1>;

const Loading = () => <ContentLoader>
  <rect x="0" y="2" width="45" height="15" />
  <rect x="50" y="2" width="45" height="15" />
  <rect x="100" y="2" width="45" height="15" />
  <rect x="0" y="25" width="300" height="300" />
</ContentLoader>;

const LandingLoader = Loadable({
  loader: () => import('../screens/Landing'),
  loading: Loading,
});

const PrivacyPolicyLoader = Loadable({
  loader: () => import('../screens/Privacy'),
  loading: Loading,
});

const TermsLoader = Loadable({
  loader: () => import('../screens/Terms'),
  loading: Loading,
});

const LoginLoader = Loadable({
  loader: () => import('../screens/Login'),
  loading: Loading,
});
const HomeLoader = Loadable({
  loader: () => import('../screens/Home'),
  loading: Loading,
});
const HomeAdminLoader = Loadable({
  loader: () => import('../screens/HomeAdmin'),
  loading: Loading,
});

const Routes = () => {
  return (
    <Switch >
      {/* <Route path="/cdc" component={RequireAuth(CDC)} /> */}
      <Route path="/admin" component={RequireAuth(HomeAdminLoader)} />
      <Route exact path="/home" component={RequireAuth(HomeLoader)} />
      <Route exact path="/login" component={LoginLoader} />
      <Route exact path="/" component={LandingLoader} />
      <Route exact path="/privacy-policy" component={PrivacyPolicyLoader} />
      <Route exact path="/terms" component={TermsLoader} />
      <Route exact path="/" component={LandingLoader} />
      <Route path="*" component={RequireAuth(notFound)} />
    </Switch>
  );
};

export default Routes;