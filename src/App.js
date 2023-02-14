import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTrip from './components/add-trip';
import TripsList from './components/trips-list';
import Login from './components/login';
import Signup from './components/signup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';
import TripDataService from './services/trips';




function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');



  async function login(user = null) {      // default user to null
    TripDataService.login(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  }




  async function logout() {
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }




  async function signup(user = null) {     // default user to null
    TripDataService.signup(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch(e => {
        console.log(e);
        setError(e.toString());
      })
  }




  return (
    <div className="App">

      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TripsApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link class="nav-link" to={"/trips"}>Trips</Link>
              {user ? (
                <Link class="nav-link" onClick={logout}>Logout ({user})</Link>
              ) : (
                <>
                  <Link class="nav-link" to={"/login"}>Login</Link>
                  <Link class="nav-link" to={"/signup"}>Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>


      <div className="container mt-4">
        <Switch>
          <Route exact path={["/", "/trips"]} render={(props) =>
            <TripsList {...props} token={token} />
          }>
          </Route>

          <Route path="/trips/create" render={(props) =>
            <AddTrip {...props} token={token} />
          }>
          </Route>

          <Route path="/trips/:id/" render={(props) =>
            <AddTrip {...props} token={token} />
          }>
          </Route>
          <Route path="/login" render={(props) =>
            <Login {...props} login={login} />
          }>
          </Route>
          <Route path="/signup" render={(props) =>
            <Signup {...props} signup={signup} />
          }>
          </Route>
        </Switch>
      </div>



      <footer className="text-center text-lg-start
        bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright 2023 - <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://github.com/chicheskybaba"
          >
            Oluwaseun Alade
            Github: https://github.com/chicheskybaba
          </a>
        </div>
      </footer>

    </div>
  );
}


export default App;


