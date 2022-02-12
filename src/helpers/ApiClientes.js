import Cookies from 'js-cookie';
import qs from 'qs';
import axios from "axios";

let token = Cookies.get('token');
const api = axios.create({
    baseURL: "http://contaspr.test/api",
    headers: {'Authorization': `bearer ${token}`}
});
  
export default api;

