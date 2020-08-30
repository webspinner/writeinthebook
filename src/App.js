import React, { Component } from 'react';
import logo from './img/logo.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import User from './pages/User'
import ResetPassword from './components/ResetPassword'
import {EventList} from './pages/Events'

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Login></Login>
                    <ul className="nav">
                        <li>
                            <Link to="/players">Players</Link>
                        </li>
                        <li>
                            <Link to="/chapters">Chapters</Link>
                        </li>
                        <li>
                            <Link to="/adventures">Adventures</Link>
                        </li>
                        <li>
                            <Link to="/creations">Creations</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path="/user/" component={User}/>
                    <Route path="/reset-password" component={ResetPassword}/>
                    <Route path="/events" component={EventList} />
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
