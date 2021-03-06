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

type Currencies = {
  [key: string]: BitcoinData
}

const getBCData = async (): Promise<Currencies> => {
  return await (await fetch('https://blockchain.info/ticker')).json();
}

const INTERVAL_TIME = 2000; // 30s

const App = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const { data, isLoading, error, refetch } = useQuery<Currencies>('bc-data', getBCData);

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch])

  console.log("referching...");

  const handleCurrencySelection = (e: any) => {
    setCurrency(e.currentTarget.value)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong.</div>

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data && Object.keys(data).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper >
  );
}

export default App;
