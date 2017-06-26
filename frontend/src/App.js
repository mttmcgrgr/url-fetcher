import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createJob, checkStatus } from  './api_util.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: "",
      formId: null,
      result: "",
      createForm: true
    }
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.update = this.update.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.isUrlValid = this.isUrlValid.bind(this);
  }

  handleUrlSubmit(e) {
  e.preventDefault();
  const input = this.state.url
  if(this.isUrlValid(this.state.url)){
  createJob(this.state.url, response => {
    this.setState({
      result: `job created - your job ID is ${response}`
     })
    })
   }
  }

  handleIdSubmit(e) {
  e.preventDefault();

  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  isUrlValid(input) {
    var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
      return false;
    else
      return true;
  }



  renderUrlForm(){
    return(
        <form onSubmit={this.handleUrlSubmit} className="form">
          <label>Enter a valid URL:
            <input
              type="text"
              className="url-input"
              value={this.state.url}
              placeholder="ex: https://www.google.com"
              onChange={this.update('url')}/>
          </label>
           <br/>
          <input type="submit" value="Create Job" className="button" />
        </form>
    )
  }

  renderIdForm(){
    return(
      <form onSubmit={this.handleIdSubmit} className="form">
        <label>Enter a job ID:
          <input
            type="text"
            className="id-input"
            value={this.state.formId}
            placeholder="ex: 3"
            onChange={this.update('formId')} />
        </label>
         <br/>
        <input type="submit" value="Get Status" className="button" />
      </form>
    )
  }

  changeForm(){
    this.setState({
      createForm: !this.state.createForm,
      result: ""
    })
  }

  renderFormType(){
    if(this.state.createForm){
      return(
        this.renderUrlForm()
      )
    } else {
      return(
       this.renderIdForm()
      )
    }
  }

  renderResults(){

  }









  render() {
    const button = this.state.createForm ? "Check Status " : "Create Job"
    return (
      <div className="App">
        <h3>Massdrop Challenge: Url Fetcher</h3>
        <br/>
        {this.renderFormType()}
        <br/>
         <div>- Or -</div>
        <br/>
        <button onClick={this.changeForm} className="button">{button}</button>
        <br/>
        <div>
          {this.state.result}
        </div>
      </div>
    );
  }
}

export default App;
