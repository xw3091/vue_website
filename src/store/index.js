import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        data
    },
    getters: {
        token: state => state.data.token,
        pubkey: state => state.data.pubkey,
        aeskey: state => state.data.aeskey,
        userId: state => state.data.userId,
        sessionId: state => state.data.sessionId
    }
})

export default store