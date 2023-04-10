import React from "react";
import "./App.css";
import main from "./Pages/Main";
import home from "./Pages/home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/resume" component={main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
