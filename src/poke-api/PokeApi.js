import React from 'react';
import axios from 'axios';

import PokemonCard from '../components/PokemonCard';

import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

class PokeApi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonDetails: [],
      offset: 0,
      limit: 6,
    }
  };

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    axios.get(this.url()).then(res => {
      let data = res.data;
      if (data) {
        this.setState({pokemons: data.results});

        this.state.pokemons.map(pokemon => {
          return axios.get(pokemon.url).then(res => {
            let data = res.data;
            if (data) {
              let temp = this.state.pokemonDetails;
              temp.push(data);
              this.setState({pokemonDetails: temp});
            }
          })
            .catch(console.log);
        });
      }
    })
      .catch(console.log);
  }

  url(): string {
    return 'https://pokeapi.co/api/v2/pokemon/?offset=' + this.state.offset + '&limit=' + this.state.limit;
  }

  getNextOffset = () => {
    return this.state.offset + this.state.limit;
  }

  getPrevOffset = () => {
    return this.state.offset - this.state.limit;
  }

  LoadMorePokemons = (newOffset) => {
    this.setState({offset: newOffset}, () => {
      console.log('Offset: ' + this.state.offset);
      this.getPokemon();
    });
  }

  handleNextPoekmonsClick = () => {
    const newOffset = this.getNextOffset();

    if (newOffset >= this.state.pokemonDetails.length) {
      this.LoadMorePokemons(newOffset);
    } else {
      this.setState({offset: newOffset}, () => {
        console.log('Offset: ' + this.state.offset)
      });
    }
  }

  handlePrevPokemonsClick = () => {
    const newOffset = this.getPrevOffset();
    this.setState({offset: newOffset}, () => {
      console.log('Offset: ' + this.state.offset);
    });
  }

  render() {
    const {pokemonDetails} = this.state;

    let isLoaded = false;

    const renderedPokemonList = pokemonDetails
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map((pokemon) => {
        return (<PokemonCard key={pokemon.id} pokemon={pokemon}/>);
      }).slice(this.state.offset, this.state.offset + this.state.limit);

    if (renderedPokemonList.length === this.state.limit) {
      isLoaded = true;
    }

    if (!isLoaded) {
      return (
        <Container>
          <Spinner animation="grow">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )
    }

    return (
      <Container>
        <CardDeck>
          {renderedPokemonList}
        </CardDeck>
          <Button
            key='prevPokemons'
            id='prevPokemons'
            onClick={this.handlePrevPokemonsClick}
            variant='primary'
          >
            Prev
          </Button>
          <Button
            key='nextPokemons'
            id='nextPokemons'
            onClick={this.handleNextPoekmonsClick}
            variant='primary'
            className='float-right'
          >
            Next
          </Button>
      </Container>

    )
  }
}

export default PokeApi;
