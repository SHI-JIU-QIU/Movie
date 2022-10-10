import axios from 'axios'
import qs from 'qs'
const serve = axios.create({
    baseURL: '/api',
    timeout: 20000
})
serve.interceptors.request.use(function (config) {
    if (config.method === 'post' || config.method === 'POST') {
        config.paramsSerializer = function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});


serve.interceptors.response.use(function (response) {
 
    
    return response.data;
}, function (error) {

    return Promise.reject(error);
});
export default serve