import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';

let users = [
  { username: 'Jerry', age: 21, gender: 'male', comment:'maybe there are a lot of apples.'},
  { username: 'Tomy', age: 22, gender: 'male' , comment:'maybe there are a lot of pies.'},
  { username: 'Lily', age: 19, gender: 'female' , comment:'maybe there are a lot of pens.'},
  { username: 'Lucy', age: 20, gender: 'female' , comment:'maybe there are a lot of children.'}
]
let missingFileds = '';
const initInputArrayData = [//This because arrays are reference types in JavaScript
    {
        'id': 'userName',
        'value': '',
        'label': 'User Name',
        'type': 'text'
    },{
        'id': 'userComment',
        'value': '',
        'label': 'Comment',
        'type': 'textarea'
    }
];
let initInputArray = [
    {
        'id': 'userName',
        'value': '',
        'label': 'User Name',
        'type': 'text'
    },{
        'id': 'userComment',
        'value': '',
        'label': 'Comment',
        'type': 'textarea'
    }
];
class DataInput extends Component{
    constructor (props) {
        super(props)
        //let  inputObj  = this.props.inputObj;//props undefined need add in constructor (props)
        this.state = { inputObj : props.inputObj }
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }
    clearUp(){
        let input = this.state.inputObj;
        input.value = '';
        //input.value = 'what happened';
        this.setState({ inputObj : input });
        //this.props.updateFunc(this.state.inputObj,true);
    }
    focus(){
        this.input.focus();
    }
    handleChange(event) {
        let input = this.state.inputObj;
        input.value = event.target.value;
        this.setState({ inputObj : input });
        //this.props.updateFunc(this.state.inputObj,true);
        //because state = props so they change together
        //reference types so react is just assign not deep copy another one
        //after first time clear,second time will fail so need to rebind
        this.props.updateFunc(this.state.inputObj,true);
    }
    renderSwitchInputType(param) {
        switch(param.type) {
          case 'text':
            return <input type="text" className="form-control" id={param.id} value={this.state.inputObj.value} onChange={this.handleChange.bind(this)} ref={(input)=>{this.input = input}}></input>;//{this.state[param.value]} will trigger error 'changing an uncontrolled input'
            //added {this.state[param.value] || ''}
            //than has init state so remove || ''
            //{this.state.inputObj[param.value]}--> this is {this.state.inputObj.''} i forget change this
          case 'textarea':
            return <textarea className="form-control" id={param.id} value={this.state.inputObj.value} onChange={this.handleChange.bind(this)} rows="3" ref={(input)=>{this.input = input}}></textarea>;

          default:
            return <input type="text" className="form-control" ref={(input)=>{this.input = input}}></input>;
        }
    }
    clearThis(e) {
        e.preventDefault();
        let input = this.state.inputObj;
        input.value = '';
        this.setState({ inputObj : input });
        //this.props.updateFunc(this.state.inputObj,true);
    }
    //inputObj={
    //'id': 'userName',
    //'value': 'name',
    //'label': 'User Name',
    //'type': 'text'
    //}
    render(){
        let  inputObjData  = this.state.inputObj
        return(
            <div className="form-group row">
            <label htmlFor={inputObjData.id} className="col-sm-4 col-form-label">{inputObjData.label} : </label>
            <div className="col-sm-8">
                {this.renderSwitchInputType(inputObjData)}
            </div>
            {/* <button onClick={this.clearThis.bind(this)} >clear</button> */}
        </div>
        )
    }
}
class AddComment extends Component {
    constructor () {
        super()
        this.state = { 
            showResults: false,
            inputObj : initInputArray,
            commentData : '',
            userNameData : ''   
        }
    }
    componentWillMount() {
        let cat = localStorage.getItem('myCat');
        let dummyObj = this.state.inputObj;
        dummyObj[0].value = cat;
        this.setState({ inputObj:dummyObj});
    }
    componentDidMount() {
        if(this['inputComponent1']){
            this['inputComponent1'].focus();
        }
    }
    updateCommentValue (newCommentData,method){
        if(method){//add
            let dummyObj = this.state.inputObj;
            if(newCommentData.id === initInputArray[0].id){
                dummyObj[0].value = newCommentData.value;
            }else if(newCommentData.id === initInputArray[1].id){
                dummyObj[1].value = newCommentData.value;
            }
            this.setState({ inputObj:dummyObj});
        }else{//clear
            console.log('clear');
            this.setState({ inputObj: initInputArrayData,commentData : '1111' });
            
            for (let i = 0; i < this.state.inputObj.length; i++) {
                this[`inputComponent${i}`].clearUp();
            } 
            let cat1 = localStorage.getItem('myCat');
            let dummyObj1 = this.state.inputObj;
            dummyObj1[0].value = cat1;
            this.setState({ inputObj:dummyObj1});
        }
    }
    showError(show) {
        this.setState({ showResults: show });
    }
    onSubmit (e) {
        //document.comment.submit();
        e.preventDefault();// prevent page refresh
        let addUserComment = {};
        // addUserComment.username = document.comment.userName.value;
        // addUserComment.comment = document.comment.userComment.value;
        addUserComment.username = this.state.inputObj[0].value;
        addUserComment.comment = this.state.inputObj[1].value;
        if(addUserComment.username.length <= 0 && addUserComment.comment.length <= 0){
            missingFileds = 'User Name and Comment';
            this.showError(true);
        }else if(addUserComment.username.length <= 0){
            missingFileds = 'User Name';
            this.showError(true);
        }else if(addUserComment.comment.length <= 0){
            missingFileds = 'Comment';
            this.showError(true);
        }else{
            this.showError(false);
            this.props.handleAdd(addUserComment);
            this.updateCommentValue({},false);
            //document.comment.reset();
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
        {this.state.inputObj.map((input, i) => <DataInput key={i} inputObj={input} updateFunc={this.updateCommentValue.bind(this)} onRef={ref => (this[`inputComponent${i}`] = ref)}/>)}
        {/* <div className="form-group row">
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
        </div> */}
        
        <button className="btn btn-primary btn-lg float-right" type="submit" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        </>
      )
    }
}

class CommentDetail extends Component{
    constructor (props) {
        super(props)
        this.state = { timeGap : '' }
    }
    msToTime(millisec) {
        console.log(millisec);
        var seconds = (millisec / 1000).toFixed(1);
        var minutes = (millisec / (1000 * 60)).toFixed(1);
        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) {
            return seconds + " Sec";
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
    }
    getTimeGap(time){
        if(!time) return;
        time = Date.parse(time);
        let now = Date.now();
        console.log(time);
        //console.log(now.toDateString());
        return this.msToTime(now - time);
    }
    componentDidMount() {
        console.log(this.props.user.username+'start');
        this.timer = setInterval(() => {
            console.log(this.props.user.username+'update');
            this.setState({ timeGap: this.getTimeGap(this.props.user.time) })
        }, 60000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    removeUserCommentCD () {
        this.props.removeFn();
    }
    render(){
        let { user } = this.props;
        let md = new Remarkable('commonmark');
        return (
            <li className="list-group-item border-info">
                <div className="row p-3">
                    <b className="col-3">{user.username} : </b>
                    <span className="col-4" dangerouslySetInnerHTML={{__html:md.render(user.comment)}}></span>
                    <span className="col-3">{this.state.timeGap}</span>
                    <button type="button" className="btn btn-primary col-2" onClick={this.removeUserCommentCD.bind(this)}>Delete</button>
                </div>
            </li>
        )
    }
}

class CommentList extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired
    }
    static defaultProps = {
        users: []
    }
    removeUserCommentCL(index) {
        this.props.removeFn(index);
    }
    render () {
        let { users } = this.props
        return (
            <ul className="list-group">
                {/* {users.map((user) => <User user={user} />)} */}
                {users.map((user, i) => <CommentDetail key={i} user={user} removeFn={this.removeUserCommentCL.bind(this)}/>)}
            </ul>
        )
    }
}

class Comment extends Component {
    constructor () {
        super()
        this.state = { usersList:  users  }
        localStorage.setItem('myCat', 'Tom');
        localStorage.setItem('listOfComment', users);
    }
    addUserComment (newComment) {
        newComment.time = new Date().toDateString();
        let newOne = this.state.usersList.concat(newComment);
        localStorage.setItem('listOfComment', newOne);
        this.setState({ usersList: newOne })
    }
    removeUserComment (index) {
        let newOne = this.state.usersList;
        newOne.splice(index,1);
        localStorage.setItem('listOfComment', newOne);
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
                    <CommentList users={this.state.usersList} removeFn={this.removeUserComment.bind(this)}/>
                </div>
            </div>
        </section>
    </div>
    </>
    )
    }
}

export default Comment;