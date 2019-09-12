import React, {Component} from 'react';

class Header extends Component {
  constructor () {
    super()
    console.log('construct')
  }

  UNSAFE_componentWillMount () {
    //UNSAFE_componentWillMount() is invoked just before mounting occurs. 
    //It is called before render(), therefore calling setState() synchronously in this method will not trigger an extra rendering. 
    //Generally, we recommend using the constructor() instead for initializing state.
    console.log('component will mount')
  }

  componentDidMount () {
    console.log('component did mount')
  }

  componentWillUnmount() {
    console.log('component will unmount')
  }
  
  render () {
    console.log('render')
    return (
      <div>
        <h1 className='title'>Hello World!</h1>
      </div>
    )
  }
}

class Index extends Component {
  constructor() {
    super()
    this.state = {
      isShowHeader: true
    }
  }

  handleShowOrHide () {
    this.setState({
      isShowHeader: !this.state.isShowHeader
    })
  }

  render () {
    return (
      <div>
        {this.state.isShowHeader ? <Header /> : null}
        <button onClick={this.handleShowOrHide.bind(this)}>
          Show / Hide Header
        </button>
      </div>
    )
  }
}

export default Index;