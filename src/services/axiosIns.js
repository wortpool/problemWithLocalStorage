import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_DEFAULT_URL + process.env.REACT_APP_API_PREFIX;
const baseURL = 'https://api.bybit.com'

const axiosIns = axios.create({
    baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosIns;