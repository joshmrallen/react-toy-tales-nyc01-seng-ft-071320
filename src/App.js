import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toyArray => {
        console.log(toyArray)
        this.setState(()=>({toys: toyArray}))
      })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  toySubmitHandler = (newToyObj) => {
    console.log(`%c`, 'color: blue', newToyObj)
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(newToyObj)
    }
    fetch('http://localhost:3000/toys', options)
      .then(res => res.json())
      .then(toy => {
        this.setState((previousState)=>({
          toys: [toy, ...previousState.toys]
        }))
      })
  }

  donateHandler = (donation) => {
    let newArray = this.state.toys
    let filteredArray = newArray.filter(toy => toy.id !== donation.id)
    this.setState(()=>({
      toys: filteredArray
    }))
    fetch(`http://localhost:3000/toys/${donation.id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(console.log(`${donation.name} has been donated to Good Will!`))
  }

  likeHandler = (likedToy) => {
    let newArray = this.state.toys
    let foundObj = newArray.find(toy => toy.id === likedToy.id)
    foundObj.likes++
    console.log(foundObj)

    this.setState(()=>({
      toys: newArray
    }))

    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({likes: foundObj.likes})
    }

    fetch(`http://localhost:3000/toys/${foundObj.id}`, options)
      .then(res => res.json())
      .then(toy => {
          // debugger
          console.log(toy)
        })

      //back-end isn't updating -- why?
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm toySubmitHandler={this.toySubmitHandler} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateHandler={this.donateHandler} likeHandler={this.likeHandler} />
      </>
    );
  }

}

export default App;



/* Heirarchy
state in App
App -> containers
App -> Form
containers -> cards
*/


/* Render Toys
1. get the array of toy objects and save them in state -- the data file is weird the readme unclear. I'm just going to treat db.json as the backend and do a fetch request
2. pass the array of toy objects to the ToyContainer
3. ToyContainer: .map over the array and pass props of the toy object properties to each card component
4. render each property of the toy object
*/


/* turn form into a controlled form
1. give state to form component locally to save form values
2. add onChange to input tags
3. define onChange method to setState of each property of the state object using event.target.value
        remember to event.persist() so the event will persist and be usable in setState
4. add value attribute to each input tag and set to this.state.propertyname
5. add onSubmit to form tag and set to submitHandler
6. define submitHandler locally and pass state object to toySubmitHandler
7. In App: pass prop toySubmitHandler and set to this.toySubmitHandler
8. In App: define toySubmitHandler method to make a post request to create a new toy entry
        in 2nd .then, call this.setState and update toys property with newToyObj and spread operator: toys: [newToyObj, ...oldArray]
*/