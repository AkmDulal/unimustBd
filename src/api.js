import axios from 'axios';

export default axios.create({
  baseURL: `http://unimustbd.com/admin/api/v1`
});