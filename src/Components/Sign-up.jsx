import React, { useState } from "react";
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'

const SignUp = () => {
    const createUser = (e, email, password) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Signed up successfuly!")
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChangeHandler = (e) => {
        const { name, value } = e.currentTarget;
        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
        else if (name === 'userName') {
            const json = JSON.stringify(value);
            localStorage.setItem("username", json);
        }
    };
    return (
        <>
            <form id="firebaseui-auth-container">
                <h1>Sign up</h1>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" placeholder="User name" name="userName" onChange={(e) => onChangeHandler(e)} />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="e.g. abcd@das.ru" name="userEmail" onChange={(e) => onChangeHandler(e)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="min 8 characters" name="userPassword" onChange={(e) => onChangeHandler(e)} />
                </div>
                <div className="form-group">
                    <label>Profile picture</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={(e) => { createUser(e, email, password) }}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered?
       <a href="/login" >Sign in</a>
                </p>
            </form>
        </>
    );
}

export default SignUp;