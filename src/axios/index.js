import request from './request'
import util from '@/utils'
const baseApi = process.env.VUE_APP_URL

// 首页
export function home (param) {
    const url = 'home'
    const data = Object.assign({
        sessionId: util.saveData.getData('sessionId') || 'bdsSc1SD0565cxAs',
        userId: parseInt(util.saveData.getData('userId')) || 36
    }, param)
    return request({
        url: baseApi + url,
        method: 'post',
        data
    })
}

// 活动
export function activ (param) {
    const url = 'activ'
    const data = Object.assign({
        sessionId: util.saveData.getData('sessionId') || 'bdsSc1SD0565cxAs',
        userId: parseInt(util.saveData.getData('userId')) || 36
    }, param)
    return request({
        url: baseApi + url,
        method: 'post',
        data
    })
}

 