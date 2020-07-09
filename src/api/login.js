import request from '../request/request'

export function get_token(data) {
    return request({
        url: '/api/get_vlist',
        // url:'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
        method: 'GET',
        params: data,
    })
}

export function get_cst_code(data) {
    return request({
        url: '/api/cst/getCode',
        method: 'POST',
        params: data
    })
}

export function check_code(data) {
    return request({
        url: '/api/cst/checkCode',
        method: 'POST',
        params: data
    })
}

export function login(data) {
    return request({
        url: '/api/cst/checkUser',
        method: 'POST',
        params: data
    })
}