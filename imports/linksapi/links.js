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

  removeLink(id){
    const lists = Links.remove({_id: id});
    this.setState({lists});
  }

  componentDidMount(){
    this.tracker = Tracker.autorun(()=>{
      const lists = Links.find().fetch();
      this.setState({lists});
    })
  }

  renderList(){
    return this.state.lists.map((item)=>{
      return(
        <div key={item._id}>
          <p>{item.url}</p>
          <button onClick={this.removeLink.bind(this, item._id)}>Delete</button>
        </div>
      );
    });
  }

  addLink(e){
    e.preventDefault();
    const link = this.refs.link.value.trim();
    const lists = Links.insert({
      url: link,
      createdAt: new Date().getTime()
    })
    this.setState({lists});
  }

  render(){
    return(
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <form onSubmit={this.addLink.bind(this)}>
          <input type="text" placeholder="Enter Link" ref="link" name="link"/>
          <button>Add Link</button>
        </form>
      <br/>
      <h2>Links</h2>
        {this.renderList()}
      </div>
    );
  }
}
