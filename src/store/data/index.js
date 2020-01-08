import { activ } from '@/axios'
import util from '@/utils'

const data = {
    state: {
        // 重要信息
        token: '',
        pubkey: '',
        aeskey: '',
        userId: '',
        sessionId: ''
    },

    mutations: {
        // 主要
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_PUBKEY: (state, pubkey) => {
            state.pubkey = pubkey
        },
        SET_AESKEY: (state, aeskey) => {
            state.aeskey = aeskey
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_SESSIONID: (state, sessionId) => {
            state.sessionId = sessionId
        }
    },

    actions: {
        // 设置状态
        setChange({ commit }, stateName) {
            return new Promise(resolve => {
                // 提交mutation来修该状态
                commit('SET_' + stateName.name, stateName.value)
                resolve()
            })
        },

        // 用户首次登录,存储token
        login({ commit }, parms) {
            return new Promise((resolve, reject) => {
                activ({
                    userName: parms.userName,
                    passWord: parms.passWord
                }).then(res => {
                    const data = res.data
                    if (data.returnCode === 0) {
                        // 设置token,暂由 sessionId代替
                        util.saveData.setToken(data.sessionId)
                        // 保存其他信息
                        util.saveData.setData('userId', data.userId)
                        util.saveData.setData('sessionId', data.sessionId)
                        commit('SET_USERID', data.userId)
                        commit('SET_SESSIONID', data.sessionId)
                    }
                    resolve()
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },

        // 登出系统,清除信息
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                util.saveData.removeToken()
                util.saveData.removeData('userId')
                util.saveData.removeData('sessionId')
                commit('SET_TOKEN', '')
                commit('SET_USERID', '')
                commit('SET_SESSIONID', '')
                resolve()
            })
        }
    }
}

export default data
