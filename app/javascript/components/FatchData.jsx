import React from 'react';
import axios from 'axios';

class FatchData extends React.Component {

    
  fetchDataFromAPI = () => {
    axios.get('/homepage/fetch_data')
      .then(response => {
        console.log(response.data.message);
        // Do something with the response if needed
        alert("hi")
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <button onClick={this.fetchDataFromAPI}>
        Fetch Data
      </button>
    );
  }
}

export default FatchData;
