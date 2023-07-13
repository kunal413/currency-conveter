import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { Link } from 'react-router-dom';

const App = () => {
  const [exchangeData, setExchangeData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      setExchangeData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = () => {
    if (exchangeData) {
      const workbook = XLSXUtils.book_new();
      const worksheet = XLSXUtils.json_to_sheet(formatCurrencyData());
      XLSXUtils.book_append_sheet(workbook, worksheet, 'Exchange Rates');
      writeFile(workbook, 'exchange_rates.xlsx');
    }
  };

  const formatCurrencyData = () => {
    const { rates } = exchangeData;
    const formattedData = [];

    for (const currency in rates) {
      formattedData.push({
        Currency: currency,
        Rate: rates[currency]
      });
    }

    return formattedData;
  };

  return (
    <div>
      <Link className="btn btn-lg custom-button"
        role="button" onClick={downloadExcel} disabled={!exchangeData}>
        Download Excel
      </Link>
    </div>
  );
};

export default App;
