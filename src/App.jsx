import React from 'react';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as B from 'react-bootstrap';
import "./App.css";

import UserList from './components/userList';
import UserAdd from './components/userAdd';
import User from './components/user';

function App() {
  return (
    <div>
      <B.Navbar bg="dark" variant="dark" expand="lg">
        <B.Container>
          <B.Navbar.Brand href="/">
            <img
              alt=""
              src="https://cdn3.iconfinder.com/data/icons/artificial-intelligence-ultra-color/60/006_-_Ai_Brain-256.png"
              width="24"
              height="24"
              className="d-inline-block"
            />{' '}
            React-Mongoose
          </B.Navbar.Brand>
          <B.Navbar.Toggle aria-controls="basic-B.navbar-nav" />
          <B.Navbar.Collapse id="basic-B.navbar-nav">
            <B.Nav className="me-auto">
              <B.Nav.Link href="/">Home</B.Nav.Link>
              <B.Nav.Link href="/add">Add User</B.Nav.Link>
            </B.Nav>
          </B.Navbar.Collapse>
        </B.Container>
      </B.Navbar>
      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/user']} component={UserList} />
          <Route exact path="/add" component={UserAdd} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
