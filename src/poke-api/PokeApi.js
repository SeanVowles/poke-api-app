import React from 'react';
import axios from 'axios';

import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import PokemonCard from '../components/PokemonCard';

class PokeApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      pokemonDetails: [],
      offset: 0,
      limit: 6,
      count: 0,
    }
  };

  /**
   * The PokeApi URL with a defined offset and limit
   *
   * @returns {string}
   */
  pokemonUrl(): string {
    return 'https://pokeapi.co/api/v2/pokemon/?offset=' + this.state.offset + '&limit=' + this.state.limit;
  }


  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.getPokemon();
  }

  /**
   * Loop through the pokemon resources
   * Load each pokemon from the resources url
   * Save the loaded pokemon into the pokemonDetails state
   */
  getPokemon() {
    axios.get(this.pokemonUrl()).then(res => {
      let data = res.data;
      console.log(data);

      if (data) {
        this.setState({pokemons: data.results, count: data.count});

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

  /**
   * Make a new API request to load some more pokemon
   * This will keep adding to the pokemonDetails state
   *
   * @param newOffset
   * @constructor
   */
  loadMorePokemons = (newOffset) => {
    this.setState({offset: newOffset}, () => {
      this.getPokemon();
    });
  }

  /**
   * calculate the next offset by taking the current offset and adding the defined limit
   *
   * @returns {*}
   */
  getNextOffset = () => {
    return this.state.offset + this.state.limit;
  }

  /**
   * calculate the previous offset by taking the current offset and subtracting the defined limit
   *
   * @returns {number}
   */
  getPrevOffset = () => {
    return this.state.offset - this.state.limit < 0 ? 0 : this.state.offset - this.state.limit
  }

  /**
   * Navigate to the start of the pokemonDetails list
   */
  handleFirstPokemonsClick = () => {
    const newOffset = 0;
    this.setState({offset: newOffset}, () => {
      console.log('Offset: ' + this.state.offset);
    });
  }

  /**
   * Navigate backwards through the list of pokemon
   */
  handlePrevPokemonsClick = () => {
    const newOffset = this.getPrevOffset();
    this.setState({offset: newOffset}, () => {
      console.log('Offset: ' + this.state.offset);
    });
  }

  /**
   * Navigate forwards through the ist of pokemon
   */
  handleNextPokemonsClick = () => {
    const newOffset = this.getNextOffset();

    if (newOffset >= this.state.pokemonDetails.length) {
      this.loadMorePokemons(newOffset);
    } else {
      this.setState({offset: newOffset}, () => {
        console.log('Offset: ' + this.state.offset)
      });
    }
  }

  handleLastPokemonsClick = () => {
    const newOffset = 893 - this.state.limit;

    if (newOffset >= this.state.pokemonDetails.length) {
      this.loadMorePokemons(newOffset);
    } else {
      this.setState({offset: newOffset}, () => {
        console.log('Offset: ' + this.state.offset)
      });
    }
  }

  /**
   * Array of pokemon to render
   * Map pokemonDetails to an id sorted array
   * Slice array by offset and offset + limit for navigation
   *
   * @param pokemonDetails
   * @returns {*}
   */
  renderPokemonList = (pokemonDetails) => {
    const start = pokemonDetails.length - this.state.limit;
    const end = pokemonDetails.length;
    return pokemonDetails
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map((pokemon) => {
        return (<PokemonCard key={pokemon.id} pokemon={pokemon}/>);
      }).slice(start, end);
  }

  render() {
    const {pokemonDetails} = this.state;

    // let isLoaded = false;

    const renderedPokemonList = this.renderPokemonList(pokemonDetails);

    // if (renderedPokemonList.length === this.state.limit) {
    //   isLoaded = true;
    // }

    // if (!isLoaded) {
    //   return (
    //     <Container>
    //       <Spinner animation="grow">
    //         <span className="sr-only">Loading...</span>
    //       </Spinner>
    //     </Container>
    //   )
    // }

    return (
      <Container>
        <div className='row'>
          <div className='col-md-12'>
            <CardDeck>
              {renderedPokemonList}
            </CardDeck>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <Pagination style={{justifyContent: 'center'}}>
              <Pagination.First
                key='firstPokemons'
                id='firstPokemons'
                onClick={this.handleFirstPokemonsClick}
              />
              <Pagination.Prev
                key='prevPokemons'
                id='prevPokemons'
                onClick={this.handlePrevPokemonsClick}
              />

              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item active>{5}</Pagination.Item>
              <Pagination.Item>{6}</Pagination.Item>
              <Pagination.Item disabled>{7}</Pagination.Item>

              <Pagination.Next
                key='nextPokemons'
                id='nextPokemons'
                onClick={this.handleNextPokemonsClick}
              />
              <Pagination.Last
                key='lastPokemons'
                id='lastPokemons'
                onClick={this.handleLastPokemonsClick}
              />
            </Pagination>
          </div>
        </div>
      </Container>

    )
  }
}

export default PokeApi;
