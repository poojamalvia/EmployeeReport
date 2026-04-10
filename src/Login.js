import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [checkuser, setcheckuser] = useState({});

  const handlechange = (e) => {
    setcheckuser({ ...checkuser, [e.target.name]: e.target.value });
  };
  const handleclick = async (e) => {
  e.preventDefault();

  if (!checkuser.email || !checkuser.pswd) {
    alert("Please enter email and password");
    return;
  }

  try {
    // 🔐 Firebase Login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      checkuser.email,
      checkuser.pswd
    );

    const user = userCredential.user;

    console.log("Login Success:", user);
    alert("Login Successful ✅");

  } catch (error) {
    console.error(error.message);
    alert("Invalid Email or Password ❌");
  }
};
  return (
    <div className="container  d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 card p-4 shadow">
        <h3 className="text-center mb-2">Login</h3>

        <div className="input-group mb-3">
          <span className="input-group-text">Email </span>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={handlechange}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Password</span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="pswd"
            onChange={handlechange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <input
            classname="btn btn-primary"
            type="submit"
            value="Log In"
            onClick={handleclick}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Login;
