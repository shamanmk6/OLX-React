import React, { useEffect, useContext } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import Create from "./Pages/Create";
import Post from "./store/PostContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { Firebase } = useContext(FirebaseContext);

  const auth = getAuth(Firebase);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Create />} path="/sell" />
            <Route element={<ViewPost />} path="/view" />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
