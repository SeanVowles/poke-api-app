import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PokeApi from './poke-api/PokeApi'
import JumbotronHeader from './components/JumbotronHeader';

function App() {
  return (
    <div>
      <JumbotronHeader />
      <PokeApi/>
    </div>
  );
}

export default App;
