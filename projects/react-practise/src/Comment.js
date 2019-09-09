import React, {Component} from 'react';

let users = [
  { username: 'Jerry', age: 21, gender: 'male', comment:'maybe there are a lot of apples.'},
  { username: 'Tomy', age: 22, gender: 'male' , comment:'maybe there are a lot of pies.'},
  { username: 'Lily', age: 19, gender: 'female' , comment:'maybe there are a lot of pens.'},
  { username: 'Lucy', age: 20, gender: 'female' , comment:'maybe there are a lot of children.'}
]
let missingFileds = '';
class AddComment extends Component {
    constructor () {
        super()
        this.state = { showResults: false }
      }
    showError(show) {
        this.setState({ showResults: show });
    }
    onSubmit (e) {
        //document.comment.submit();
        e.preventDefault();// prevent page refresh
        let addUserComment = {};
        addUserComment.username = document.comment.userName.value;
        addUserComment.comment = document.comment.userComment.value;
        if(!document.comment.userComment.value && !document.comment.userName.value){
            missingFileds = 'User Name and Comment';
            this.showError(true);
        }else if(!document.comment.userName.value){
            missingFileds = 'User Name';
            this.showError(true);
        }else if(!document.comment.userComment.value){
            missingFileds = 'Comment';
            this.showError(true);
        }else{
            this.showError(false);
            this.props.handleAdd(addUserComment);
            document.comment.reset();
        }
        // this.setState({
        //     usersList: this.props.users
        // })
        // this.setState(users => ({
        //     usersList: [...users, addUserComment]
        // }));
        // let joined = this.props.users.concat(addUserComment);
        // this.setState({ usersList: joined })
        
        //console.log(this.state.usersList + 'userName');
    
        // this.props.likedText = '取消'
        // { this.state.showResults ? <div class="alert alert-danger" role="alert">{missingFileds} : is missing.</div> : null }
    }
    render () {

      return (
        <>
        <div role="alert" className={'alert alert-danger ' + (this.state.showResults ? '' : 'd-none')}>{missingFileds} : is missing.</div> 
        
        <form className="clearfix" name="comment">
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
        
        <button className="btn btn-primary btn-lg float-right" type="submit" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        </>
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
    addUserComment (newComment) {
        let newOne = this.state.usersList.concat(newComment);
        this.setState({ usersList: newOne })
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
            <AddComment users={this.state.usersList} handleAdd={this.addUserComment.bind(this)}></AddComment>
            </div>
        </section>
        <hr/>
        <section className="pb-3">
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