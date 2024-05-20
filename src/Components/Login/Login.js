import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Firebase } = useContext(FirebaseContext);
  const handleLogin = (evnt) => {
    evnt.preventDefault();

    const auth = getAuth(Firebase);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/')
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        alert(error.message)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(evnt)=>{
              setEmail(evnt.target.value)
            }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(evnt)=>{
              setPassword(evnt.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
