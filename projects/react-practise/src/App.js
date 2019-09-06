import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  renderGoodWord (goodWord, badWord) {
    return Math.random() * 100 > 50 ? goodWord : badWord
  };

  render (){
    
    const word = 'Hello World!'
    const className = 'App-header'
    const isTrainingGood = false

    return (
    <React.Fragment>
    <div>Test</div>
    <div className="App">
      <header className={className}>
        <p>{word}</p>
        <p>{(function () { return 'This is returned by function.'})()}</p>
        {isTrainingGood
          ? <strong> The training is good.</strong>
          : null
        }

        {this.renderGoodWord(
          <strong> Condition One </strong>,
          <span> Condition Two </span>
        )}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </React.Fragment>
    )
  };
}

export default App;
