import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://www.boredapi.com/api/activity?';

function accessibilityVerbal(factor) {
  let verbal = '';

  if (factor < 0.4) verbal = 'Easy';
  else if (factor < 0.6) verbal = 'Medium';
  else verbal = 'Difficult';

  return verbal;
}

function priceVerbal(factor) {
  let verbal = 'Free';

  if (factor >= 0.8) verbal = 'Expensive';
  else if (factor >= 0.6) verbal = 'Pricey';
  else if (factor >= 0.3) verbal = 'Moderate';
  else if (factor >= 0.1) verbal = 'Cheap';

  return verbal;
}

function App() {
  const [activity, setActivity] = useState('');
  const [accessibility, setAccessibility] = useState(0.0);
  const [type, setType] = useState('');
  const [participants, setParticipants] = useState(0);
  const [price, setPrice] = useState(1.0);
  const [maxPrice, setMaxPrice] = useState(1.0);
  //const [key, setKey] = useState('');

  useEffect(() => {
    const address = API_URL +
      'minprice=0.0' +
      '&maxprice=' + maxPrice;

    axios.get(address)
      .then((response) => {
        setActivity(response.data.activity);
        setAccessibility(response.data.accessibility);
        setType(response.data.type);
        setParticipants(response.data.participants);
        setPrice(response.data.price);
        //setKey(response.data.key);
      }).catch(error => {
        alert(error);
      });
  }, [maxPrice]);

  const handleChange = (e) => {
    setMaxPrice(e.target.value);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className='jumbotron'>
      <h1 className='display-4'>Inspirify</h1>
      <h3>{activity}!</h3>
      <p>Type: {type}</p>
      <p>Participants: {participants}</p>
      <p>Accessibility: {accessibilityVerbal(accessibility)}</p>
      <p>Price: {priceVerbal(price)}</p>
      <hr className='my-4' />
      <h4>Get another activity</h4>
      <form className='form-inline'>
          <label className='my-1 mr-2' htmlFor='maxPrice'>Max price</label>
          <select className='custom-select form-control mb-2 mr-sm-2' id='maxPrice' value={maxPrice} onChange={handleChange}>
            <option value='0.0'>Free</option>
            <option value='0.2'>Cheap</option>
            <option value='0.5'>Moderate</option>
            <option value='0.7'>Pricey</option>
            <option value='1.0'>Expensive</option>
          </select>
          <button type='button' className='btn btn-primary mb-2' onClick={refreshPage}>Inspirify!</button>
      </form>
    </div>
  );
}

export default App;
