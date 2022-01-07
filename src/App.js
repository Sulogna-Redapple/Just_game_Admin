import React from 'react'
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Login} from './Modules/Pages/login';
import {Otp} from './Modules/Pages/otp';
import EditLeague from './Modules/fragments/edit_league';
import EditBattle from './Modules/fragments/edit_battle';
import {Register} from './Modules/Pages/register';
import {Dashboard} from './Modules/Pages/dashboard';
import {Page404} from './Modules/Pages/page404';
import {Page500} from './Modules/Pages/page500';
import {ResetPassword} from './Modules/Pages/reset_password';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  document.title = 'JustGameAdmin'
  
  return (
  <>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/otp" name="Otp Page" render={(props) => <Otp {...props} />} />
            <Route exact path="/edit_league" name="Edit League" render={(props) => <EditLeague {...props} />} />
            <Route exact path="/edit_battle" name="Edit Battle" render={(props) => <EditBattle {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/reset_password" name="Reset Password" render={(props) => <ResetPassword {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <Dashboard {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>

  </>
  );
}

export default App;
