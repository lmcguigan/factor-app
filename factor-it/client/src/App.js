import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import FactorInterface from "./pages/FactorInterface";
import Home from "./pages/Home";
import Register from "./pages/Register"

const App = () =>(
  <Router>
    <Wrapper>
      <Route exact path = "/" component = {Home}/>
      <Route exact path = "/factor/:id" component = {FactorInterface}/>
      <Route exact path = "/register" component = {Register}/>
    </Wrapper>
  </Router>
);

export default App;
