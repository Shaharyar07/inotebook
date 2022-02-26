import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import About from "./Components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertComp from "./Components/AlertComp";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import React from "react";



function App() {
  
  const [alert, setAlert] = React.useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Router>
        <Header />
        <AlertComp alert={alert} />
        <div className="container border shadow px-5 bg-light">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
