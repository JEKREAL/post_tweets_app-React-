import React, { useContext, useState } from "react";
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import TweetContext from "./TweetContext"


const ui = new firebaseui.auth.AuthUI(firebase.auth())
const Login = () => {
    const authContext = useContext(TweetContext);
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (authresult) => {
                const { displayName, uid } = authresult.user;
                const authUser = {
                    uid,
                    displayName
                }
                authContext.login(authUser)
                return false
            }
        },
    }, [authContext]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signinUser = (e,email,password) => {
        e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
    //   const user = userCredential.user;
    })
    .catch((error) => {
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
    });
    }
    const onChangeHandler = (e) => {
        const { name, value } = e.currentTarget;
        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    };

    return (
        <>
            {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
            <form id="firebaseui-auth-container">
                <h1>Sign in</h1>
                <p className="forgot-password text-right">
                    Or Sign Up<a href="/sign-up">here</a>
                </p>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="userEmail" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="userPassword" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(e) => { signinUser(e, email, password) }}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </>
    );
}

export default Login;