import axios from 'axios';
import { BASEURL } from './config';

export default axios.create({
    baseURL: BASEURL
});