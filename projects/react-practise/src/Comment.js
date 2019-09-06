import React, {Component} from 'react';

let users = [
  { username: 'Jerry', age: 21, gender: 'male', comment:'maybe there are a lot of apples.'},
  { username: 'Tomy', age: 22, gender: 'male' , comment:'maybe there are a lot of pies.'},
  { username: 'Lily', age: 19, gender: 'female' , comment:'maybe there are a lot of pens.'},
  { username: 'Lucy', age: 20, gender: 'female' , comment:'maybe there are a lot of children.'}
]

class CommentList extends Component {
  render () {
    let { user } = this.props
    return (
        <li className="list-group-item border-info">
            <div className="p-3">
                <b className="col-3">{user.username} : </b>
                <span className="col-9">{user.comment}</span>
            </div>
        </li>
    )
  }
}

class Comment extends Component {
    constructor () {
        super()
        this.state = { usersList: { users } }
    }
  render () {
    return (
    <>
    <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Navbar</span>
    </nav>
    <div className="container">
        <h1 className="text-center mt-3">Comment List</h1>
        <p className="lead">
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
        </p>
        <div className="row justify-content-md-center bg-light pt-3">
            <div className="col-sm">
            <ul className="list-group">
                {/* {users.map((user) => <User user={user} />)} */}
                {users.map((user, i) => <CommentList key={i} user={this.state.usersList} />)}
            </ul>
            </div>
        </div>
      
    </div>
    </>
    )
  }
}

export default Comment;