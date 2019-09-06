import React, { Component } from 'react'
import './index.css'

class LikeButton extends Component {
  static defaultProps = {
    likedText: 'Unlike',
    unlikedText: 'Like'
  }

  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })

    // this.props.likedText = '取消'


    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? this.props.likedText : this.props.unlikedText} 👍
      </button>
    )
  }
}

export default LikeButton