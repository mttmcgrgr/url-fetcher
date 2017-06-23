import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: "",
      errors: "",
      createdId: null,
      enteredId: null,
      jobStatus: "",
    }
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.update = this.update.bind(this);
    this.renderJobId = this.renderJobId.bind(this);
    this.renderStatusCheck = this.renderStatusCheck.bind(this);
  }


  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }


  handleUrlSubmit(e) {
		e.preventDefault();
		const url = this.state.url;
		let id = createJob(url);
    this.setState({createdId: id})
	}

  handleIdSubmit(e) {
		e.preventDefault();
		const id = this.state.id;
		let status = checkJobStatus(id);
    this.setState({jobStatus: status})
	}

  renderJobId(){
    if(this.state.createdId){
      return(
        <div>Job created! Your job ID is { this.state.createdId }</div>
      )
    } else {
      return(
        <div>{ this.state.errors }</div>
      )
    }
  }

  render() {
     return(
       <div className="container">
         Hi I'm The App!
       </div>
     )
   }


}

export default App;




{/* <div>
  <div className="">
    <form onSubmit={ this.handleUrlSubmit }>
      <h3>Create a Job Here</h3>
      <br/>
      <label>Enter a valid URL:
        <input
          type="text"
          value={ this.state.url }
          onChange={ this.update('url') }
          placeholder="ex: www.google.com" />
      </label>
      <br/>
      <input type="submit" value="Create"/>
    </form>
    <br/>
      <div>
        { this.renderJobId() }
      </div>
  </div>
  <br/>
  <div className="">
    <form onSubmit={ this.handleIdSubmit }>
      <h3>Check on a job here</h3>
      <br/>
      <label>Enter a valid Job ID:
        <input
          type="text"
          value={ this.state.enteredId }
          onChange={ this.update('enteredId') }
          placeholder="ex: 3" />
      </label>
      <br/>
      <input type="submit" value="Check"/>
    </form>
    <br/>
      <div>

      </div>
  </div>
</div> */}
