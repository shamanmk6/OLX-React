import React, { useState, useContext } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();

  const { Firebase } = useContext(FirebaseContext);
  const db = getFirestore(Firebase);
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    const auth = getAuth(Firebase);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Update user's display name
        await updateProfile(auth.currentUser, {
          displayName: username, // Use 'displayName' instead of 'diplayName'
        });

        // After updating the display name, add user to Firestore
        await addDoc(collection(db, "users"), {
          id: user.uid,
          username: username,
          phone: phone,
        });

        // Redirect user to login page
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle error
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(evnt) => {
              setUsername(evnt.target.value);
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(evnt) => {
              setEmail(evnt.target.value);
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(evnt) => {
              setPhone(evnt.target.value);
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(evnt) => {
              setPassword(evnt.target.value);
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
