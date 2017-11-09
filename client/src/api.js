import axios from 'axios';

export default getState => axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  transformResponse: [function (data) {
    try {
      return JSON.parse(data);
    } catch(Exception) {
      return data;
    }
  }],
});
