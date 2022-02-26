import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      //redirect
      localStorage.setItem("token", data.authtoken);
      history.push("/");
      showAlert("Logged in Successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className="text-center mt-2 fw-bold text-danger ">
        Welcome to iNotebook <br className="mb-2 " /> Login to continue
      </h2>
      <Form className="m-5 " onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
