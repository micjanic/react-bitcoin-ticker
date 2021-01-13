import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
// Styles
import { Wrapper } from './styles/App.styles';

type BitcoinData = {
  '15m': number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
}

const getBCData = async () => {
  await (await fetch('https://blockchain.info/ticker')).json();
}


const App = () => {
  return (
    <div className="App">start
    </div>
  );
}

export default App;
