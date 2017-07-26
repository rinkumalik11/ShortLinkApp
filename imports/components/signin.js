import React from 'react';
import {Meteor} from 'meteor/meteor';

export default class Signin extends React.Component{

  onLogin(e){
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value;

    Meteor.loginWithPassword({email},password,(err,res)=>{
      console.log('Signin Callback',err,res);
    });
  }

  render(){
    return(
      <div>
        <h3>Login Form</h3>
        <form onSubmit={this.onLogin.bind(this)}>
          <input name="email" placeholder="Enter Email" ref="email" type="email"/>
          <input name="password" placeholder="Enter Password" ref="password" type="password"/>
          <button>Login</button>
        </form>
      </div>
    );
  }
}
