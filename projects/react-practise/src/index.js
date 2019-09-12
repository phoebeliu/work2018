import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ComponentIndex from './ComponentExample';
import LikeButton from './LikeButton'
import LikeButtonWithProps from './LikeButtonWithProps'
import LikeButtonUpdateProps from './LikeButtonUpdateProps'
import ListIndex from './ListExample';
import Comment from './Comment';
import 'bootstrap/dist/css/bootstrap.css';
import Index from './LifeCycle2';

// ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Comment />, document.getElementById('root'));
ReactDOM.render(<Index />, document.getElementById('root'));
// ReactDOM.render(<ComponentIndex />, document.getElementById('root'));

// ReactDOM.render(<LikeButton />, document.getElementById('root'));

// ReactDOM.render(<LikeButtonWithProps 
//     likedText = '111' unlikedText = '222'
//     onClick={() => console.log('Click on like button!')}
//     />, document.getElementById('root'));

// ReactDOM.render(<LikeButtonUpdateProps />, document.getElementById('root'));

// ReactDOM.render(<ListIndex />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
