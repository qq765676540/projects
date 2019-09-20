import axios from 'axios';
import qs from 'qs';

const apitest = (params) => {
    return axios.get('http://192.168.28.1:8040/services/getKpiList', {
        params: params
    })
};


export {
    apitest
};
