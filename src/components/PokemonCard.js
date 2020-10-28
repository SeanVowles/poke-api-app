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
    const image = this.props.pokemon.sprites.other.dream_world.front_default ? this.props.pokemon.sprites.other.dream_world.front_default : this.props.pokemon.sprites.front_default;

    return (
      <Card
        style={{minWidth: '17rem'}}
        className='mb-4'
      >
        <Card.Img
          variant='top'
          src={image}
          onLoad={this.handleImageLoaded.bind(this)}
          style={{height: '125px', width: 'auto'}}
          className='mt-4'
        >
        </Card.Img>
        <Card.Body>
          <div
            className='text-center'
          >
            {this.handleLoadingImageDisplay()}
          </div>
          <Card.Text className='text-center'>
            <span>#{this.props.pokemon.id}</span>
          </Card.Text>
          <Card.Title className='mb-0 text-center'>
            <span>{this.props.pokemon.name}</span>
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default PokemonCard;
