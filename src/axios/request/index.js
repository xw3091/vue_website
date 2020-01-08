import axios from 'axios'
// import store from '@/store'
// import { Message, MessageBox } from 'element-ui'
// import util from '@/utils'
import { Message } from 'element-ui'

// 随机生成key
// const initKey = util.encrypt.randomKey(true, 10, 32)
// function encryptResponse(responseData) {
//     // 解析请求体，获取rsa公钥
//     const pubkey = util.encrypt.getRsaKey(responseData)
//     // 存储rsa公钥
//     store.dispatch('setChange', { name: 'PUBKEY', value: pubkey }).then(() => {
//         util.saveData.setData('PUBKEY', pubkey)
//     })
//     // 解析请求体
//     const tempData = util.encrypt.styleEncrypt(responseData + '')
//     responseData = JSON.parse(tempData)
//     return responseData
// }

// 创建axios
const service = axios.create({
    // 请求地址
    baseURL: process.env.VUE_APP_URL,
    headers: {
        'X-Requested-with': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
    console.log('<请求数据>')
    console.log(config.data)
    // 生成ase加密key, 将随机aesKey存储，等到请求返回后用来解析
    // store.dispatch('setChange', { name: 'AESKEY', value: initKey }).then(() => {})
    // if (util.saveData.getData('PUBKEY')) {
    //     // 请求头进行rsa加密
    //     const rsaData = util.encrypt.rsaEncrypt(initKey, util.saveData.getData('PUBKEY'))
    //     // 将rsa加密后的ase解密用的key存入token中，并增加了请求头当中
    //     store.dispatch('setChange', { name: 'TOKEN', value: rsaData }).then(() => {})
    //     config.headers['random_aes_password'] = rsaData
    // }
    // config.headers['sjzencode'] = 1
    // // 请求体进行ase加密, 调用ase加密函数加密请求体
    // config.data = util.encrypt.aesEncrypt(JSON.stringify(config.data), initKey)
    return config
}, () => {
    Promise.reject('error')
})

// 响应拦截
service.interceptors.response.use(
    response => {
        // if (String(response.data).indexOf('pubKey') > 0) {
        //     response.data = encryptResponse(response.data)
        // } else {
        //     // 有公钥的前提下对返回体解密
        //     response.data = util.encrypt.aesDecrypt(response.data, store.getters.aeskey)
        //     response.data = JSON.parse(response.data)
        // }
        const res = response.data
        console.log('<返回数据>')
        console.log(res)
        // 0请求成功, 8用户识别信息过期
        return response
        // if (res.returnCode !== 0) {
        //     if (res.returnCode === 8 || res.returnCode === 1003) {
        //         MessageBox.confirm('您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //             confirmButtonText: '重新登录',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //         }).then(() => {
        //             store.dispatch('FedLogOut').then(() => {
        //                 // 重新实例化router
        //                 location.reload()
        //             })
        //         }).catch(() => {})
        //     } else if (util.saveData.getToken() && res.returnCode === 555) {
        //         MessageBox.alert('当前公钥版本不一致，请重新登入', '警告', {
        //             confirmButtonText: '确定',
        //             showClose: false,
        //             type: 'error'
        //         }).then(() => {
        //             store.dispatch('FedLogOut').then(() => {
        //                 // 重新实例化router
        //                 location.reload()
        //             })
        //         }).catch(() => {})
        //     } else if (!util.saveData.getToken() && res.returnCode === 555) {
        //         // 首次请求,无密钥,返回参数
        //         return response
        //     } else {
        //         let length = document.getElementsByClassName('el-message').length
        //         if (length === 0) {
        //             Message({
        //                 message: res.errInfo || '错误码:' + res.returnCode,
        //                 type: 'error',
        //                 duration: 2 * 1000
        //             })
        //         }
        //     }
        //     return Promise.reject(response)
        // } else {
        //     return response
        // }
    },
    error => {
        Message({
            message: 'err' + error,
            type: 'error',
            duration: 2 * 1000
        })
        return Promise.reject(error)
    })

export default service
