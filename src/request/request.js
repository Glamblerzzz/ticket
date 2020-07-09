import axios from 'axios'

//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 200000, // 请求超时时间
    withCredentials: true // 选项表明了是否是跨域请求
})
// 请求拦截
service.interceptors.request.use(config => {
    console.log('request go');    
    if(config.method=='post'){
        config.data= config.params
        config.params={}
    }
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})
//拦截响应
service.interceptors.response.use(config => {
    console.log('response get')
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        
        /**
        * code为非000000是抛错 可结合自己业务进行修改
        */
        //针对微信接口的处理
        const res = response.data
        // if (!res.code) {
        //     if (res.ErrorCode === 0) {
        //         return res
        //     } else {
        //         return Promise.reject('error')
        //     }
        // }

        if (!res.code) {
            return res
        }
        //根据后台接口来进行数据拦截处理
        else if (res.code !== '200' && res.code !== 200) {
            console.log("response", res)
            res.code = res.data.code || res.errorCode
            // res.message = res.response.data.msg
            return Promise.reject('error；', res.errorMsg)
        } else {
            return response.data
        }
    },
    error => {
        return Promise.reject(error)
    }
)
export default service