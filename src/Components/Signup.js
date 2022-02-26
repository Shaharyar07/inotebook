import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
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
      showAlert("Account Created Successfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className="text-center mt-2 fw-bold ">
        Create an Account <br className="mb-2 text-info" /> to use iNotebook
      </h2>
      <Form className="m-5 py-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
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
            placeholder="Password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            minLength={5}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your Password"
            name="cpassword"
            id="cpassword"
            value={credentials.cpassword}
            onChange={handleChange}
            minLength={5}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default Signup;
