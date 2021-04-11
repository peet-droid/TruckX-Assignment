import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Nothing from './void';

class Newuser extends React.Component{
        constructor(props){
                super(props);
                this.state = {
                        id: 0,
                        email:'',
                        first_name: '',
                        last_name: '',
                        
                }
        }

        changeHandler = e => {
                this.setState({[e.target.name] : e.target.value})
        }

        submitHandler = e => {
                e.preventDefault();
                axios.post('https://reqres.in/api/users',this.state)
                .then(res => console.log(res.data));
                this.setState({
                        ...this.state,
                        id: Number(this.state.id)
                })
                this.props.newuser(this.state);
                alert("new user added go to Table page")
        }


        render() {
                ReactDOM.render(<Nothing /> , document.getElementById('adduser'))
                return(
                        <form>
                                First Name:
                                <input type="text" name="first_name" id="first_name" 
                                onChange={this.changeHandler}/><br/>
                                Last Name:
                                <input type="text" name="last_name" id="last_name"
                                onChange={this.changeHandler} /><br/>
                                email:
                                <input type="text" name="email" id="email"
                                onChange={this.changeHandler} /><br/>
                                ID:
                                <input type="number" name="id" id="id"
                                onChange={this.changeHandler} /><br/>
                                <button type="submit" onClick={this.submitHandler}>NewUser</button>
                        </form>
                        
                );
        }       
}

const mapStateToProps = (state) => {
        return{
                data: state.data,
                user: state.user
        }
}

const mapDispatchToProps = (dispatch) => {
        return{
                newuser: (user) => {dispatch({type: "newuser", newuser: user})}
        }
}



export default connect(mapStateToProps,mapDispatchToProps)(Newuser);