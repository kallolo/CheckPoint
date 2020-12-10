import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.10.66:4321/APICheckpoint',
    // baseURL: 'https://apiku.sambu.co.id/APICheckpoint',
    // baseURL: 'https://api-psp.sambu.co.id/APICheckpoint',
})