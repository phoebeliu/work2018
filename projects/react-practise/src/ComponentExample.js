import React, {Component} from 'react';

class Title extends Component {
  handleClickOnTitle (data, e) {
    console.log(e.target.innerHTML)
    console.log(this);
    console.log(data);
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, {data:'Hello World!'})}>This is title.</h1>
    )
  }
}

class Header extends Component {
    render () {
      return (
        <div>
          <Title />
          <h2>This is Header</h2>
        </div>
      )
    }
  }

  class Main extends Component {
    render () {
      return (
      <div>
        <h2>This is main content</h2>
      </div>
      )
    }
  }

  class Footer extends Component {
    render () {
      return (
      <div>
        <h2>This is footer</h2>
      </div>
      )
    }
  }

  class Index extends Component {
    render () {
      return (
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      )
    }
  }

  export default Index;