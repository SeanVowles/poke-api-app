import Jumbotron from 'react-bootstrap/Jumbotron';
import React from 'react';

function JumbotronHeader() {
  return (
    <Jumbotron>
      <h1>Pokedex</h1>
      <p>
        This is a simple pokedex, using the PokeApi which can be found <a href='https://pokeapi.co/' target='_blank'
                                                                          rel='noreferrer'>here</a>
      </p>
    </Jumbotron>
  )
}

export default JumbotronHeader;
