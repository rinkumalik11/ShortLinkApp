import React from 'react';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{

  constructor(props){
    super(props);

    this.state={
      error: ''
    };
  }

  onSubmit(e){
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value;

    if(email === "" || password === ""){
      this.setState({error: "All fields should be provided"});
    }

    Accounts.createUser({email,password},(err,res)=>{
      console.log('Signup callback',err,res);
    });
  }

  render(){
    return(
      <div>
        <h2>Signup Here</h2>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" placeholder="Enter Email" ref="email" name="email"/>
          <input type="password" placeholder="Enter Password" ref="password" name="password"/>
          <button>Signup</button>
        </form>
      </div>
    );
  }
}
