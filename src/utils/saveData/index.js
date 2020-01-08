import Cookies from 'js-cookie'

const tokenKey = 'token'

const saveData = {}

saveData.getToken = () => {
    return Cookies.get(tokenKey)
}

saveData.setToken = (token) => {
    return Cookies.set(tokenKey, token)
}

saveData.removeToken = () => {
    return Cookies.remove(tokenKey)
}

saveData.getData = (name) => {
    return Cookies.get(name)
}

saveData.setData = (name, data) => {
    return Cookies.set(name, data)
}

saveData.removeData = (name) => {
    return Cookies.remove(name)
}

saveData.setStorage = (key, value) => {
    return sessionStorage.setItem(key, value)
}

saveData.getStorage = (key) => {
    return sessionStorage.getItem(key)
}

saveData.removeStorage = (key) => {
    return sessionStorage.removeItem(key)
}

export default saveData
