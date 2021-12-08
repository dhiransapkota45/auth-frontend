import React, { useState } from "react";
// import { stateContext } from "../Contexts/State";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [response, setResponse] = useState({});
  const [alertshower, setAlertshower] = useState(false);
  const baseUrl = `http://localhost:5000/api`;
  let navigate = useNavigate();

  const onchange = (e) => {
    // console.log(e.target.name);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    const loginUrl = `${baseUrl}/login`;
    const fetcher = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const fetched_data = await fetcher.json();
    setResponse(fetched_data);
    console.log(fetched_data);
    await setCredentials({
      email: "",
      password: "",
    });

    if (fetched_data.success) {
      localStorage.setItem("token", fetched_data.authToken);
      navigate("/");
    } else {
      setAlertshower(true);
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
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={onchange}
              value={credentials.email}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={onchange}
              value={credentials.password}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
