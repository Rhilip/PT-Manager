import axios from 'axios';
import axiosGmxhrAdapter from 'axios-userscript-adapter'

axios.defaults.adapter = axiosGmxhrAdapter;
axios.defaults.withCredentials = true;
