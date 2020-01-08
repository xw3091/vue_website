const validate = {}

// url验证
validate.validateURL = (url) => {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9])+$/
    return reg.test(url)
}

// email验证
validate.validateEmail = (email) => {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(email)
}

// 汉字验证
validate.validateChinese = (chinese) => {
    const reg = /^[\u4e00-\u9fa5]{0,}$/
    return reg.test(chinese)
}

// 身份证号验证
validate.validateId = (id) => {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return reg.test(id)
}

// 手机号验证
validate.validatePhoneNumber = (phoneNumber) => {
    const reg = /^[1][3|4|5|6|7|8|9]\d{9}$/
    return reg.test(phoneNumber)
}

export default validate
