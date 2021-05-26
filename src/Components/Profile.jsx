import React, { Component } from "react"


export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Anonymus'
    }
  }

  saveusername = (e) => {
    const json = JSON.stringify(this.state.username);
    localStorage.setItem("username", json);
  }

  render() {
    return (
      <>
        <div className="new_row">
          <h1 id="Profile">Profile</h1>
          <div className="col-md-4 col-md-offset-2" >
            <label id="forUsername">User Name</label>
            <textarea placeholder={this.props.username} onChange={(e)=>this.setState({
      username: e.target.value
    })} id="username" />
            <button type="submit" onClick={this.saveusername} className="btn btn-primary" id="save">Save</button>
          </div>
        </div>
      </>
    );
  }
}

export default Profile
