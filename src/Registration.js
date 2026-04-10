import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [signupdata, setsignupdata] = useState({});

  const handlechange = (e) => {
    setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
  };

  const handleclick = async (e) => {
  e.preventDefault();

  if (!signupdata.uname || !signupdata.email || !signupdata.pswd) {
    alert("All fields are required!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signupdata.email,
      signupdata.pswd
    );

    // ✅ FIX HERE
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      uname: signupdata.uname,
      email: signupdata.email,
    });

    alert("User Registered Successfully ✅");

    setsignupdata({ uname: "", email: "", pswd: "" });

  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
};

  // const handleclick = async (e) => {
  //   e.preventDefault();

  //   if (!signupdata.uname || !signupdata.email || !signupdata.pswd) {
  //     alert("All fields are required!");
  //     return;
  //   }

  //   try {
  //     // 🔐 Create user with Firebase Auth
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       signupdata.email,
  //       signupdata.pswd,
  //     );

  //     const user = userCredential.users;

  //     // ☁️ Store extra data in Firestore
  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       uname: signupdata.uname,
  //       email: signupdata.email,
  //     });

  //     alert("User Registered Successfully ✅");

  //     // Clear form
  //     setsignupdata({ uname: "", email: "", pswd: "" });
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     alert(error.message);
  //   }
  // };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card  p-4 shadow w-50">
        <h3 className="text-center mb-3">Sign UP</h3>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Name
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Username"
            name="uname"
            aria-describedby="basic-addon1"
            value={signupdata.uname}
            onChange={handlechange}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Email
          </span>
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            aria-label="Username"
            name="email"
            value={signupdata.email}
            aria-describedby="basic-addon1"
            onChange={handlechange}
          />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Password
          </span>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            aria-label="Username"
            name="pswd"
            value={signupdata.pswd}
            aria-describedby="basic-addon1"
            onChange={handlechange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <input
            classname="btn btn-primary"
            type="submit"
            value="Sign Up"
            onClick={handleclick}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Registration;
