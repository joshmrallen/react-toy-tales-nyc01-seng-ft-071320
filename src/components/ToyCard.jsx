import React, { Component } from 'react';

class ToyCard extends Component {

  delHandler = () => {
    this.props.donateHandler(this.props)
  }

  likeHandler = () => {
    this.props.likeHandler(this.props)

    // const totalLikes = this.props.likes + 1

    // const newObj = {
    //   // id: this.props.id,
    //   // name: this.props.name,
    //   // image: this.props.image,
    //   likes: totalLikes
    // }

    // const options = {
    //     method: 'PATCH',
    //     headers: {
    //       'constent-type': 'application/json',
    //       accepts: 'application/json'
    //     },
    //     body: JSON.stringify(newObj)
    //   }

    //   fetch(`http://localhost:3000/toys/${this.props.id}`, options)
    //     .then(res => res.json())
    //     .then(toy => {
    //         // debugger
    //         // console.log(`${toy.name} has been liked ${toy.likes} times`)
    //         console.log(toy)
    //       })
      
      console.log(`${this.props.name} has been liked!`)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button className="like-btn" onClick={this.likeHandler}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.delHandler}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
