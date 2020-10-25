import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: props.pokemon,
      loaded: false,
    }
  }

  handleImageLoaded = () => {
    this.setState({loaded: true});
  }

  handleLoadingImageDisplay = () => {
    return (
      this.state.loaded ? null :
        <Spinner animation="border"/>
    )
  }

  render() {
    return (
      <Card
        style={{minWidth: '18rem'}}
        className='mb-4'
      >
        <Card.Img
          variant='top'
          src={this.props.pokemon.sprites.other.dream_world.front_default}
          onLoad={this.handleImageLoaded.bind(this)}
          style={{maxHeight: '125px'}}
          className='mt-4'
        >
        </Card.Img>
        <Card.Body>
          <div
            className='text-center'
          >
            {this.handleLoadingImageDisplay()}
          </div>
          <Card.Title
            className='mb-0 text-center'
          >
            {this.props.pokemon.name}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default PokemonCard;
