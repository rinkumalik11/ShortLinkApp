import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Tracker} from 'meteor/tracker';

import {Links} from './linkapi';

export default class Link extends React.Component{

  constructor(props){
    super(props);

    this.state={
      lists: []
    }
  }

  onLogout(){
    Accounts.logout();
  }

  componentDidMount(){
    Tracker.autorun(()=>{
      const lists = Links.find().fetch();
      this.setState({lists});
    })
  }

  renderList(){
    return this.state.lists.map((item)=>{
      return(
        <div key={item._id}>
          <p>{item.url}</p>
          <button>Delete</button>
        </div>
      );
    });
  }

  render(){
    return(
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <input type="text" placeholder="Enter Link" name="link"/>
      <br/>
      <h2>Links</h2>
        {this.renderList()}
      </div>
    );
  }
}
