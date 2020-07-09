import request from '../request/request'

export function get_ticket_list(data) {
    return request({
        url: '/api/cst/getList',
        // url:'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
        method: 'POST',
        params: data,
    })
}

export function get_mer_list(data) {
    return request({
        url: '/api/mer',
        method: 'GET',
        params: data,
    })
}