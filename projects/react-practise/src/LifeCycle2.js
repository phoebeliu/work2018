import React, {Component} from 'react';

class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentWillMount () {
    this.timer = setInterval(() => {// if don't clearInterval 
    //the react had remove this component but the browser stack still have this component so they can not call the setState function and will have the error in console
      this.setState({ date: new Date() })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div>
        <h1>
          <p>Current time is:</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    )
  }
}

class Index extends Component {
  constructor () {
    super()
    this.state = { isShowClock: true }
  }

  handleShowOrHide () {
    this.setState({
      isShowClock: !this.state.isShowClock
    })
  }

  render () {
    return (
      <div>
        {this.state.isShowClock ? <Clock /> : null }
        <button onClick={this.handleShowOrHide.bind(this)}>
          Show / Hide Clock
        </button>
      </div>
    )
  }
}

export default Index;