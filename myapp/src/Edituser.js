import React from 'react';

class Edituser extends React.Component{
        constructor(props){
                super(props);
                this.state = {
                        id: this.props.state.id,
                        email:this.props.state.email,
                        first_name: this.props.state.first_name,
                        last_name: this.props.state.last_name,
                }
        }

        changeHandler = e => {
                this.setState({[e.target.name] : e.target.value})
        }

        submitHandler = e => {
                e.preventDefault();
                this.props.edituser(this.state);
        }


        render() {
                return(
                        <form>
                                First Name:
                                <input type="text" name="first_name" id="first_name" defaultValue={this.state.first_name}
                                onChange={this.changeHandler}/><br/>
                                Last Name:
                                <input type="text" name="last_name" id="last_name" defaultValue={this.state.last_name}
                                onChange={this.changeHandler} /><br/>
                                email:
                                <input type="text" name="email" id="email" defaultValue={this.state.email}
                                onChange={this.changeHandler} /><br/>
                                ID:{this.state.id}<br/>
                                <button type="submit" onClick={this.submitHandler}>EditUser</button>
                        </form>
                        
                );
        }  


}

export default Edituser;