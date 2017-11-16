import axios from 'axios';

export default getState => axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  transformResponse: [function (data) {
    try {
      return JSON.parse(data);
    } catch(Exception) {
      return data;
    }
  }],
});

export const apiWithToken = getState => axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getState().getIn(['account', 'accessToken'], '')}`,
  },

  transformResponse: [function (data) {
    try {
      return JSON.parse(data);
    } catch(Exception) {
      return data;
    }
  }],
});

export const client =  axios.create({
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
})

const endpointdev = "http://localhost:5000";
const endpoint = "https://localhost:5000";

export const endPoint = () => {
  if(process.env.NODE_ENV == 'production'){
    return endpoint;
  }else {
    return endpointdev;
  }
}
