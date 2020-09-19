import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const makeToys = () => {
    return props.toys.map(toy => <ToyCard key={toy.id} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes} donateHandler={props.donateHandler} likeHandler={props.likeHandler} />)
  }

  return(
    <div id="toy-collection">
      {makeToys()}
    </div>
  );
}

export default ToyContainer;
