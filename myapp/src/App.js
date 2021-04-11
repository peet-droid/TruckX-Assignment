import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './login';
import Changename from './changename';
import Edituser from './Edituser';
import { Link } from 'react-router-dom';
import Newuser from './changename';
import Nothing from './void';
import {connect} from 'react-redux';
import Base from './base';

import Deluser from './deleteuser';

class App extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props,"in app js")
    // var Httpreq = new XMLHttpRequest(); // a new request
    // Httpreq.open("GET","https://reqres.in/api/users",false);
    // Httpreq.send(null);
    // this.json_obj = JSON.parse(Httpreq.responseText);
    // this.users = this.json_obj;
    this.state={
      data: this.props.data,
      serachid: 0
    }
  }

  myFunction = (e) =>{
    this.setState({
      data:this.state.data,
      serachid:e.target.value,
    })
  }

  adduser = (newuser)=>{
    newuser.id = Number(newuser.id)
    let user = [...this.state.data, newuser]
    this.setState({
      data: user,
      serachid:this.state.serachid,
    })

  }

  edituser = (user)=>{
    let users = [...this.state.data]
    var i;
    for(i = 0;i< users.length;i++){
      if(user.id == users[i].id){
        users[i].id = user.id;
        users[i].first_name = user.first_name;
        users[i].last_name = user.last_name;
        users[i].email = user.email;
      }
    }

    this.props.update(users)

    this.setState({
      data: users,
      serachid:this.state.serachid,
    })

    ReactDOM.render(<Nothing/> , document.getElementById('adduser'))

  }

  deluser = (user) => {
    let users = [...this.state.data]
    users = users.filter(function(u){
      return u.id != user.id;
    })
    
    this.props.update(users)

    this.setState({
      data:users,
      serachid:this.state.serachid,
    })
    ReactDOM.render(<Nothing /> , document.getElementById('adduser'))
  }

  DELUser = (id) => {
    ReactDOM.render(<Deluser deluser={this.deluser} id={id}/> , document.getElementById('adduser'))
  }


  myEdit = (e) =>{
    ReactDOM.render(<Newuser adduser={this.adduser}/> , document.getElementById('adduser'))
  }

  editUser = (id,fname,lname,email) =>{
    let state = {
      id: id,
      first_name: fname,
      last_name: lname,
      email: email
    }
    ReactDOM.render(<Edituser edituser={this.edituser} state={state}/> , document.getElementById('adduser'))
  }
  
  render() {
    //alert("there is a little bug please try setting the search box item to 0 see all the entries");
    let data = this.state.data;
    let listItems = data.map((d) => {
    if(this.state.serachid == 0){
      return(
      <tr>
        <td key={d.first_name}>{d.first_name}</td>
        <td key={d.last_name}>{d.last_name}</td>
        <td key={d.id}>{d.id}</td>
        <td key={d.email}>{d.email}</td>
        <td>
              <button type="submit" 
                onClick={()=>this.editUser(d.id,d.first_name,d.last_name,d.email)}>
                Edit
              </button>
            </td>
            <td>
              <button type="button" 
                onClick={()=>this.DELUser(d.id)}>
                Delete
              </button>
            </td>
      </tr>
      )
    }
    else{
      if((d.id) == this.state.serachid){
        return(
          <tr>
            <td key={d.first_name}>{d.first_name}</td>
            <td key={d.last_name}>{d.last_name}</td>
            <td key={d.id}>{d.id}</td>
            <td key={d.email}>{d.email}</td>
            <td>
              <button type="submit" 
                onClick={()=>this.editUser(d.id,d.first_name,d.last_name,d.email)}>
                Edit
              </button>
            </td>
            <td>
              <button type="button" 
                onClick={()=>this.DELUser(d.id)}>
                Delete
              </button>
            </td>
          </tr>
        )
      }
      else{
        return null;
      }
    }});
    return (
      <div>
        <input type="number" name="id" id="searchbar" placeholder="id,first_name" onChange={this.myFunction}/><br/>
          <button onClick={this.myEdit}>Add user</button>
        <br/><br/><br/>
        <table className="app-content">
        <tr>
          <th>Firstame</th>
          <th>Lastname</th>
          <th>ID</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
          {listItems}
        </table>
        
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  console.log(state,"in mapstateprops in app js")
  if(state.state){
    return{
      data: state.state.data,
      user: state.state.user
    }
  }
  else{
    return{
      data: state.data,
      user: state.user
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    newuser: (user) => {dispatch({type: "newuser", newuser: user})},
    update:  (user) => {dispatch({type: "update", user: user})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
