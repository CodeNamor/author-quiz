import React from 'react';
import './App.css';


function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  </div>);
}

function Turn() {
  return null
}

function Continue() {
    return null
}

function Footer() {
  return null
}

function App() {
  return (
    <div className="container-fluid">
      <Hero/>
      <Turn/>
      <Continue />
      <Footer />
    </div>
  );
}

export default App;
