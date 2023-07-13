import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Graph_Data from './Graph_Data';

function Currency() {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [date, setDate] = useState("");

  const [time, setTime] = useState();

  useEffect(() => {
    // Fetch the currency data from the spreadsheet or API
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const data = response.data;
        const currencyCodes = Object.keys(data.rates);
        setCurrencies(currencyCodes);
        setBaseCurrency('USD');
        setTargetCurrency(currencyCodes[0]);
        setDate(data.date);
            const timestamp = data.time_last_updated;
            const updatedTime = new Date(timestamp * 1000).toLocaleTimeString();
            setTime(updatedTime);
      })
      .catch(error => {
        console.log('Error fetching currency data:', error);
      });
  }, []);

  const convertCurrency = () => {
    if (baseCurrency === targetCurrency) {
      setResult(amount);
    } else {
      // Make the currency conversion calculation here
      axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then(response => {
          const data = response.data;
          const exchangeRate = data.rates[targetCurrency];
          setResult(amount * exchangeRate);
        })
        .catch(error => {
          console.log('Error fetching exchange rate:', error);
        });
    }
  };
  const currencyData = [




    { date: '2023-07-01', rate: 1.2 },



    { date: '2023-07-02', rate: 1.5 },



    { date: '2023-07-03', rate: 1.8 },



    // Add more data as needed



  ];
  return (
    <div className='container card text-center w-50  h-50 '>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="base-currency">Base Currency:</label>
        <select
          id="base-currency"
          value={baseCurrency}
          onChange={e => setBaseCurrency(e.target.value)}
          className='form-control'
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select> 
      </div>
      <div>
        <label htmlFor="target-currency">Target Currency:</label>
        <select
          id="target-currency"
          value={targetCurrency}
          onChange={e => setTargetCurrency(e.target.value)}
          className='form-control'
          placeholder='select your currency'
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className='form-control'
        />
      </div>
      <br />
      <div>
      <Link
          onClick={convertCurrency} 
          className="btn btn-lg custom-button"
          role="button"
        >
          Convert
        </Link>
      </div>
      {result && (
        <>
        <br />
        <div>
          <h2>Result:</h2>
          <p>{amount} {baseCurrency} = {result} {targetCurrency}</p>
        </div>
        </>
      )}
      <div>
      <p>{date} <span>{time}</span></p>
        <Graph_Data data={currencyData} />
      </div>
    </div>
  );
}

export default Currency;