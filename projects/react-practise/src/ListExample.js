import React, {Component} from 'react';

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  render () {
    const { user } = this.props
    return (
      <div>
        <div>Username：{user.username}</div>
        <div>Age：{user.age}</div>
        <div>Gender：{user.gender}</div>
        <hr />
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <>
      <div>
        {[
          <span key='1'>React.js </span>,
          <span key='2'>is </span>,
          <span key='3'>good</span>
        ]}
      </div>
      <div>
        {/* {users.map((user) => <User user={user} />)} */}
        {users.map((user, i) => <User key={i} user={user} />)}
      </div>
      </>
    )
  }
}

export default Index;