import axios from 'axios';

// 创建axios，赋给变量service

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    return config;
}, function (error){
    return Promise.reject(error);
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response){
    return response;
}, function (error){
    return Promise.reject(error);
});

export default service;