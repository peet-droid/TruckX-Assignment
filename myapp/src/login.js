import React from 'react';
import ReactDOM from 'react-dom';

import Base from './base';

class Login extends React.Component {
        constructor(props){
                super(props);
                this.state = {
                        first_name:'',
                        last_name: '',
                        id: '',
                }
                console.log("handled authentication");
                
        }

        changeHandler = e =>{
              this.setState({[e.target.name] : e.target.value});  
        }

        submitHandler = e =>{
                var Httpreq = new XMLHttpRequest(); // a new request
                Httpreq.open("GET","https://reqres.in/api/users",false);
                Httpreq.send(null);
                this.json_obj = JSON.parse(Httpreq.responseText);
                const data = this.json_obj.data;
                let truuser = false;
                const listItems = data.map((d) => {
                        if(this.state.first_name == d.first_name && this.state.last_name == d.last_name
                                && this.state.id == d.id){
                                truuser = true;
                        }
                });

                if(truuser){
                        alert("welcome "+this.state.first_name+"");
                        ReactDOM.render(<Base /> , document.getElementById('app'))
                }
        }

        render(){
                return(
                        <form>
                                First Name:
                                <input type="text" name="first_name" id="first_name" 
                                onChange={this.changeHandler}/><br/>
                                Last Name:
                                <input type="text" name="last_name" id="last_name"
                                onChange={this.changeHandler} /><br/>
                                ID:
                                <input type="number" name="id" id="id"
                                onChange={this.changeHandler} /><br/>
                                <button type="submit" onClick={this.submitHandler}>Submit</button>
                        </form>
                )
        }

}

export default Login;