import React from 'react';
import axios from 'axios';

class Deluser extends React.Component{
        constructor(props){
                super(props);
                this.state = {
                        id: '',
                }
        }

        changeHandler = e => {
                this.setState({[e.target.name] : e.target.value})
        }

        submitHandler = e => {
                e.preventDefault();
                if(this.props.id == this.state.id){
                        axios.delete(`https://reqres.in/api/users/${this.state.id}`)
                        .then(res => console.log(res.data));
                        this.props.deluser(this.state);
                }
                else{
                        alert('incorrect password');
                }
        }


        render() {
                return(
                        <form>
                                ID(as password):
                                <input type="number" name="id" id="id"
                                onChange={this.changeHandler} /><br/>
                                <button type="submit" onClick={this.submitHandler}>Delete</button>
                        </form>
                        
                );
        }       
}

export default Deluser;
