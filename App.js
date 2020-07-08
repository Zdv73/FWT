import React from "react";
import "./App.css";
import Container from "./components/Container.js";

//export default axios.create({
//  REACT_APP_API_KEY: `http://localhost:3000/tasks`
//});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container />
        <input type="hidden" defaultValue={process.env.REACT_APP_API_KEY} />
      </div>
    );
  }
}

export default App;
