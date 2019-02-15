import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/repositories';

// Fetch City Locality
async function getResult(query) {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&order=asc`);
    return {
      type: 'FETCH_DATA',
      payload: response
    };
  } catch (error) {
    return error;
  }
}

export default getResult;
