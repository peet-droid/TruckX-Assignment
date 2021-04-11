import App from "./App";
import Login from "./login";
import ReactDOM from 'react-dom';
import Newuser from "./changename";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';

import {Provider} from 'react-redux';

var Httpreq = new XMLHttpRequest(); // a new request
Httpreq.open("GET","https://reqres.in/api/users",false);
Httpreq.send(null);
let json_obj = JSON.parse(Httpreq.responseText);

const instate = {
        data : json_obj.data,
        user : "true"
}


function reducer(state=instate,action){
        if(action.type == "newuser"){
                console.log(state,"in reducer")

                if(state.state){
                        console.log("if stat passed")
                        return{
                                ...state.state,
                                data: [...state.state.data,action.newuser]
                        }
                }
                else{
                        return{
                                ...state,
                                data: [...state.data,action.newuser]
                        }
                }
        }

        if(action.type == "update"){
                console.log(action.user,"in reducer")

                if(state.state){
                        return{
                                ...state.state,
                                data: [...action.user]
                        }
                }
                else{
                        return{
                                ...state,
                                data: [...action.user]
                        }
                }
        }
        else{
                return{
                        state
                }
        }

        
}


const store = createStore(reducer);

store.subscribe(() =>
        console.log(store.getState(),"after updation")
)


function Base() {
        return(
                <Router>
                        <div>
                                <ul>
                                        <li>
                                                <Link to="/Table">Table</Link>
                                        </li>
                                        <li>
                                                <Link to="/Newuser">Newuser</Link>
                                        </li>
                                </ul>        
                            <Switch>
                                <Route exact path="/Table">
                                        <Provider store={store}><App/></Provider>
                                </Route>
                                <Route exact path="/Newuser">
                                        <Provider store={store}><Newuser /></Provider>
                                </Route>
                            </Switch>    
                        </div>
                </Router>
        );

}

export default Base;