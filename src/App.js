import TweetMainForm from './Components/TweetMainForm';
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './Components/Profile';
import UserContext from './Components/UserContext'
import Login from "./Components/Login"
import Signup from "./Components/Sign-up"
import NavBar from "./Components/Navbar"
import 'firebase/auth'
import 'firebase/firestore'
import TweetContext from "./Components/TweetContext"
import firebase from 'firebase';

function App() {
  const [authUser, setAuthUser] = useState(null)
  const login = async (authUser) => {
    setAuthUser(authUser);
    await firebase
      .firestore()
      .collection('users')
      .doc(authUser.uid)
      .set({ name: authUser.displayName })
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, [])
  return (
    <TweetContext.Provider value={{
      authUser,
      login,
      logout: () => setAuthUser(null
      )
    }}>
      {!authUser && <Signup /> && <Login />}
      {authUser &&
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Switch>
              <Route path="/" exact >
                <UserContext.Consumer>
                  {(currentUser) => <TweetMainForm currentUser={currentUser} />}
                </UserContext.Consumer>
              </Route>
              <Route path="/profile" render={() => <Profile userName={JSON.parse(localStorage.getItem("username"))} />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/sign-up" render={() => <Signup />} />
            </Switch>
          </div>
        </BrowserRouter>}
    </TweetContext.Provider>
  );
}

export default App;
