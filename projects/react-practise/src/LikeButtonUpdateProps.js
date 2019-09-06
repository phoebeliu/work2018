import React, {Component} from 'react';
import LikeButtonWithProps from './LikeButtonWithProps'

class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: 'Liked',
      unlikedText: 'Like'
    }
  }

  handleClickOnChange () {
    this.setState({
      likedText: 'Bad',
      unlikedText: 'Good'
    })
  }

  render () {
    return (
      <div>
        <LikeButtonWithProps
          likedText={this.state.likedText}
          unlikedText={this.state.unlikedText} />
        <div>
          <button onClick={this.handleClickOnChange.bind(this)}>
            Updte wordings
          </button>
        </div>
      </div>
    )
  }
}
export default Index;