import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    id: Math.floor(Math.random()*100),
    name: "",
    image: "",
    likes: 0

  }

  changeHandler = (event) => {
    event.persist()
    this.setState(()=>({
      [event.target.name]: event.target.value
    }))
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.toySubmitHandler(this.state)
    this.setState(()=>({
      id: Math.floor(Math.random()*100),
      name: "",
      image: ""
    }))
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.changeHandler} />
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.changeHandler} />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit" />
        </form>
      </div>
    );
  }

}

export default ToyForm;
