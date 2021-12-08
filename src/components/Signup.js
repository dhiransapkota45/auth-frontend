import React, { useContext, useState } from "react";
import { stateContext } from "../Contexts/State";
import { useNavigate } from "react-router-dom";
// import {FontAwesomeIcon} from "font-awesome"

function Signup() {
  const [response, setResponse] = useState({});
  const [alertshower, setAlertshower] = useState(false);
  const baseUrl = `http://localhost:5000/api`;
  let navigate = useNavigate();
  const context = useContext(stateContext);
  const { credentials, setCredentials } = context;

  const onchange = (e) => {
    // console.log(e.target.name);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const signupUrl = `${baseUrl}/signup`;
      const fetcher = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const fetched_data = await fetcher.json();
      setResponse(fetched_data);
      console.log(fetched_data);
      await setCredentials({
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });

      if (fetched_data.success) {
        localStorage.setItem("token", fetched_data.authToken);
        navigate("/");
      } else {
        setAlertshower(true);
      }
    } else {
      setAlertshower(true);

      setResponse({ msg: "password must be same" });
      setCredentials({ username: "", email: "", password: "", cpassword: "" });
    }
  };

  return (
    <>
      {alertshower && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {response.msg}
          
        </div>
      )}
      <div className="container">
        <form onSubmit={onsubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              name="username"
              value={credentials.username}
              onChange={onchange}
            />
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={onchange}
              value={credentials.password}
              name="password"
            />
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Your Password"
              onChange={onchange}
              value={credentials.cpassword}
              name="cpassword"
            />
          </div>

          <button
            type="submit"
            // disabled={credentials.username.length<5 || credentials.email.length<1 || credentials.password.length<5 || credentials.cpassword.length<5}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
