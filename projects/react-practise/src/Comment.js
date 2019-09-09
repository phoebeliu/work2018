import React, {Component} from 'react';

let users = [
  { username: 'Jerry', age: 21, gender: 'male', comment:'maybe there are a lot of apples.'},
  { username: 'Tomy', age: 22, gender: 'male' , comment:'maybe there are a lot of pies.'},
  { username: 'Lily', age: 19, gender: 'female' , comment:'maybe there are a lot of pens.'},
  { username: 'Lucy', age: 20, gender: 'female' , comment:'maybe there are a lot of children.'}
]

class AddComment extends Component {
    submitForm () {
        console.log('userName');
        this.setState({
            usersList: this.props.users
        })
    
        // this.props.likedText = '取消'
    
    
        if (this.props.onClick) {
          this.props.onClick()
        }
    }
    render () {
      let { users } = this.props.users

      return (
        <form className="clearfix">
        <div className="form-group row">
            <label htmlFor="userName" className="col-sm-4 col-form-label">User Name : </label>
            <div className="col-sm-8">
                <input type="text" className="form-control" id="userName"></input>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="userComment" className="col-sm-4 col-form-label">Comment : </label>
            <div className="col-sm-8">
                <textarea className="form-control" id="userComment" rows="3"></textarea>
            </div>
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg float-right" onClick={this.submitForm.bind(this)}>Submit</button>
        </form>
      )
    }
  }

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
        this.state = { usersList:  users  }
    }
  render () {
    return (
    <>
    <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Navbar</span>
    </nav>
    <div className="container">
        <section>
            <h2 className="text-center mt-3">Add Your Comment Below</h2>
            <p className="lead">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
            </p>
            <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <AddComment users={this.state.usersList}></AddComment>
            </div>
        </section>
        <hr/>
        <section>
            <h1 className="text-center mt-3">Comment List</h1>
            <p className="lead">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
            </p>
            <div className="row justify-content-md-center bg-light pt-3">
                <div className="col-sm">
                <ul className="list-group">
                    {/* {users.map((user) => <User user={user} />)} */}
                    {this.state.usersList.map((user, i) => <CommentList key={i} user={user} />)}
                </ul>
                </div>
            </div>
        </section>
    </div>
    </>
    )
  }
}

export default Comment;