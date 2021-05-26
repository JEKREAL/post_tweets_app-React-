import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'

export default function NavBar() {
return (<Navbar bg="dark" variant="dark" id="navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/sign-up">Sign-up</Nav.Link>
                        <Nav.Link href="/sign-out" onClick={()=>{
                            firebase.auth().signOut().then(() => {
                                alert("Sign out successfull")
                              });                           
                        }}>Sign-out</Nav.Link>
                    </Nav>
                </Navbar>)
}